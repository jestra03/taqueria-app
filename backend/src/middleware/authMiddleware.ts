// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { createClient } from "@supabase/supabase-js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';

// Extend Request interface to include user
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
                userId: number;
                username: string;
                email: string;
            };
        }
    }
}

interface JWTPayload {
    userId: number;
    username: string;
    email: string;
    iat: number;
    exp: number;
}

export const authenticateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log("🔒 Auth middleware called");
    try {
        const authHeader = req.headers.authorization;
        console.log("🔒 Incoming Authorization header:", authHeader);

        const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>
        console.log("🔑 Extracted token:", token);

        if (!token) {
            console.warn("🚫 No token provided in Authorization header");
            res.status(401).json({ error: 'Access token required' });
            return;
        }

        // Verify the custom JWT token
        const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
        console.log("🧪 Decoded JWT payload:", decoded);

        // Optional: Verify user still exists and is verified in database
        const { data: user, error } = await supabase
            .from("users")
            .select("userID, username, email, verified")
            .eq("userID", decoded.userId)
            .eq("verified", true)
            .single();

        if (error || !user) {
            console.warn("⛔ User not found or not verified in database");
            res.status(403).json({ error: 'User not found or not verified' });
            return;
        }

        // Set user data on request object (mapping for consistency)
        req.user = {
            id: decoded.userId,        // For compatibility with existing code
            userId: decoded.userId,    // Keep original field name
            username: decoded.username,
            email: decoded.email
        };

        console.log("✅ Authenticated user:", {
            id: req.user.id,
            userId: req.user.userId,
            username: req.user.username,
            email: req.user.email
        });
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            console.warn("⛔ Invalid JWT token:", error.message);
            res.status(403).json({ error: 'Invalid or expired token' });
            return;
        }

        console.error("🔥 Auth middleware internal error:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Optional auth - doesn't fail if no token
export const optionalAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        console.log("🤷 Optional auth - token:", token ? "present" : "absent");

        if (token) {
            try {
                const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;

                // Optional DB check for optional auth
                const { data: user, error } = await supabase
                    .from("users")
                    .select("userID, username, email, verified")
                    .eq("userID", decoded.userId)
                    .eq("verified", true)
                    .single();

                if (!error && user) {
                    req.user = {
                        id: decoded.userId,
                        userId: decoded.userId,
                        username: decoded.username,
                        email: decoded.email
                    };
                    console.log("👍 Optional auth - user found:", decoded.userId);
                } else {
                    console.warn("⚠️ Optional auth - user not found in DB");
                }
            } catch (jwtError) {
                console.warn("⚠️ Optional auth - invalid token");
            }
        }

        next();
    } catch (error) {
        console.error("💥 Optional auth middleware error:", error);
        next(); // Continue even if error
    }
};