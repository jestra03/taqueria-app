import { Router, RequestHandler } from "express";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const router = Router();

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';
const SALT_ROUNDS = 12;

const emailTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

const generateVerificationCode = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// LOGIN
const login: RequestHandler = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ error: "Username and password are required" });
            return;
        }

        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('username', username)
            .single();

        if (error || !user || !user.verified) {
            res.status(401).json({ error: "Invalid credentials or not verified" });
            return;
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            res.status(401).json({ error: "Invalid username or password" });
            return;
        }

        const token = jwt.sign(
            { userId: user.userID, username: user.username, email: user.email },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        await supabase
            .from('users')
            .update({ joinedDate: new Date().toISOString() })
            .eq('userID', user.userID);

        const { password: _, verificationCode, ...safeUser } = user;
        res.status(200).json({ user: safeUser, token, message: "Login successful" });

    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

// SIGNUP
const signup: RequestHandler = async (req, res) => {
    try {
        const { username, email, password, fullName } = req.body;

        if (!username || !email || !password || password.length < 6) {
            res.status(400).json({ error: "Valid username, email, and password are required" });
            return;
        }

        const { data: existingUsername } = await supabase
            .from("users")
            .select("userID")
            .eq("username", username)
            .single();

        if (existingUsername) {
            res.status(409).json({ error: "Username already exists" });
            return;
        }

        const { data: existingEmail } = await supabase
            .from("users")
            .select("userID")
            .eq("email", email.toLowerCase())
            .single();

        if (existingEmail) {
            res.status(409).json({ error: "Email already registered" });
            return;
        }

        const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
        const verificationCode = generateVerificationCode();

        const { data: newUser, error: insertError } = await supabase
            .from("users")
            .insert({
                username,
                email: email.toLowerCase(),
                password: passwordHash,
                fullName: fullName || "",
                joinedDate: new Date().toISOString(),
                verified: false,
                verificationCode,
                account_type: "user",
                isProfilePicture: false
            })
            .select("*")
            .single();

        if (insertError) {
            console.error("Insert error:", insertError);
            res.status(500).json({ error: "Signup failed" });
            return;
        }

        await emailTransporter.sendMail({
            from: process.env.SMTP_FROM || process.env.SMTP_USER,
            to: email,
            subject: "🌮 Verify Your Taqueria Account",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">Welcome to Taqueria App!</h2>
                    <p>Hi ${fullName || username},</p>
                    <p>Please verify your email with the code below:</p>
                    <div style="background: #f4f4f4; padding: 20px; text-align: center; margin: 20px 0;">
                        <h1 style="color: #667eea; font-size: 32px;">${verificationCode}</h1>
                    </div>
                </div>`
        });

        const { password: _, verificationCode: __, ...userOut } = newUser!;
        res.status(201).json({ user: userOut, message: "Check your email for verification code." });

    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

// VERIFY EMAIL
const verifyEmail: RequestHandler = async (req, res) => {
    try {
        const { email, verificationCode } = req.body;
        const emailString = String(email).toLowerCase();
        const codeString = String(verificationCode);

        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', emailString)
            .eq('verificationCode', codeString)
            .eq('verified', false)
            .single();

        if (error || !user) {
            res.status(400).json({ error: "Invalid verification code or already verified" });
            return;
        }

        const { error: updateError } = await supabase
            .from('users')
            .update({ verified: true, verificationCode: null })
            .eq('userID', user.userID);

        if (updateError) {
            res.status(500).json({ error: "Failed to verify email" });
            return;
        }

        const token = jwt.sign(
            { userId: user.userID, username: user.username, email: user.email },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(200).json({
            message: "Email verified successfully",
            token,
            user: {
                userID: user.userID,
                username: user.username,
                email: user.email,
                fullName: user.fullName,
                verified: true
            }
        });

    } catch (err) {
        console.error("Verification error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

// RESEND VERIFICATION
const resendVerification: RequestHandler = async (req, res) => {
    try {
        const { email } = req.body;
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email.toLowerCase())
            .eq('verified', false)
            .single();

        if (error || !user) {
            res.status(404).json({ error: "User not found or already verified" });
            return;
        }

        const newCode = generateVerificationCode();

        const { error: updateError } = await supabase
            .from('users')
            .update({ verificationCode: newCode })
            .eq('userID', user.userID);

        if (updateError) {
            res.status(500).json({ error: "Failed to update verification code" });
            return;
        }

        await emailTransporter.sendMail({
            from: process.env.SMTP_FROM || process.env.SMTP_USER,
            to: email,
            subject: "🌮 Your New Verification Code",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2>Verification Code Resent</h2>
                    <p>Hi ${user.fullName || user.username},</p>
                    <p>Your new code:</p>
                    <div style="background: #f4f4f4; padding: 20px; text-align: center;">
                        <h1 style="color: #667eea;">${newCode}</h1>
                    </div>
                </div>`
        });

        res.status(200).json({ message: "Verification code resent." });

    } catch (err) {
        console.error("Resend error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

// LOGOUT
const logout: RequestHandler = async (_req, res) => {
    res.status(200).json({ message: "Logged out successfully" });
};

// GET CURRENT USER
const getCurrentUser: RequestHandler = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(' ')[1];

        if (!token) {
            res.status(401).json({ error: "No token provided" });
            return;
        }

        const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };

        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('userID', decoded.userId)
            .single();

        if (error || !user) {
            res.status(401).json({ error: "Invalid token" });
            return;
        }

        const { password, verificationCode, ...userSafe } = user;
        res.status(200).json({ user: userSafe });
    } catch (err) {
        console.error("Get user error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

router.post("/login", login);
router.post("/signup", signup);
router.post("/verify-email", verifyEmail);
router.post("/resend-verification", resendVerification);
router.post("/logout", logout);
router.get("/user", getCurrentUser);

export default router;