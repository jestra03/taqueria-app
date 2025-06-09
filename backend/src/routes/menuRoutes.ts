// src/routes/menuRoutes.ts
import { Router, Request, Response, NextFunction } from "express";
import { createClient, PostgrestError } from "@supabase/supabase-js";
import { authenticateToken } from "../middleware/authMiddleware";
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
        console.log(data);
        return;
    } catch (err) {
        const message =
            (err as PostgrestError).message || "Failed to fetch menu items";
        console.error("Supabase error:", err);
        res.status(500).json({ error: message });
        return;
    }
});

// POST /api/favorites/add
router.post("/favorites/add", authenticateToken, (req, res) => {
    (async () => {
        try {
            const { foodId } = req.body;
            const userId = req.user.id; // ✅ Changed from req.user.userID to req.user.id

            console.log("🍕 Adding favorite - User ID:", userId, "Food ID:", foodId);

            const { data: userData, error: fetchError } = await supabase
                .from("users")
                .select("favoriteMenuItems")
                .eq("userID", userId) // Make sure this column name matches your database
                .single();

            if (fetchError) {
                console.error("❌ Failed to fetch favorites:", fetchError.message);
                return res.status(500).json({ error: fetchError.message });
            }

            const currentFavorites = userData.favoriteMenuItems || [];

            if (currentFavorites.includes(foodId.toString())) {
                console.log(`ℹ️ User ${userId} already favorited food ${foodId}`);
                return res.status(200).json({ message: "Already favorited" });
            }

            const updatedFavorites = [...currentFavorites, foodId.toString()];

            const { error: updateError } = await supabase
                .from("users")
                .update({ favoriteMenuItems: updatedFavorites })
                .eq("userID", userId); // Make sure this column name matches your database

            if (updateError) {
                console.error("❌ Failed to update favorites:", updateError.message);
                return res.status(500).json({ error: updateError.message });
            }

            console.log(`✅ Added food ${foodId} to favorites for user ${userId}`);
            return res.status(200).json({ message: "Added to favorites" });
        } catch (err) {
            console.error("🔥 Uncaught /favorites/add error:", err);
            return res.status(500).json({ error: "Internal error" });
        }
    })();
});



export default router;