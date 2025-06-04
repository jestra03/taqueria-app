// src/routes/menuRoutes.ts
import { Router, Request, Response, NextFunction } from "express";
import { createClient, PostgrestError } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

// Initialize Supabase client with service role key (server‐side)
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// GET /menu/items
router.get("/items", async (_req: Request, res: Response, _next: NextFunction): Promise<void> => {
    try {
        // Query the "menu" table in Supabase
        const { data, error } = await supabase.from("menu").select("*");

        if (error) {
            throw error;
        }
        res.status(200).json(data);
        return;
    } catch (err) {
        const message =
            (err as PostgrestError).message || "Failed to fetch menu items";
        console.error("Supabase error:", err);
        res.status(500).json({ error: message });
        return;
    }
});

export default router;