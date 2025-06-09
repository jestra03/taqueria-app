// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Extend Request interface to include user
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const authenticateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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

        const { data: { user }, error } = await supabase.auth.getUser(token);
        console.log("🧪 Supabase auth.getUser result:", { user, error });

        if (error || !user) {
            console.warn("⛔ Invalid or expired token");
            res.status(403).json({ error: 'Invalid or expired token' });
            return;
        }

        req.user = user;
        console.log("✅ Authenticated user object:", JSON.stringify(user, null, 2)); // Add this line
        console.log("✅ Authenticated user:", user.id);
        console.log("✅ Authenticated user:", user.id);
        next();
    } catch (error) {
        console.error("🔥 Auth middleware internal error:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Optional auth - doesn't fail if no token
export const optionalAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        console.log("🤷 Optional auth - token:", token);

        if (token) {
            const { data: { user }, error } = await supabase.auth.getUser(token);
            if (!error && user) {
                req.user = user;
                console.log("👍 Optional auth - user found:", user.id);
            } else {
                console.warn("⚠️ Optional auth - token invalid or expired");
            }
        }

        next();
    } catch (error) {
        console.error("💥 Optional auth middleware error:", error);
        next(); // Continue even if error
    }
};
