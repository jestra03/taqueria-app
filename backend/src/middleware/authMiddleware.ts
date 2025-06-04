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
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

        if (!token) {
            res.status(401).json({ error: 'Access token required' });
            return;
        }

        // Verify the token with Supabase
        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error || !user) {
            res.status(403).json({ error: 'Invalid or expired token' });
            return;
        }

        // Add user to request object
        req.user = user;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Optional auth - doesn't fail if no token
export const optionalAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if (token) {
            const { data: { user }, error } = await supabase.auth.getUser(token);
            if (!error && user) {
                req.user = user;
            }
        }

        next();
    } catch (error) {
        console.error('Optional auth middleware error:', error);
        next(); // Continue even if error
    }
};