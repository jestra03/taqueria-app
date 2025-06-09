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

// POST /menu/favorites/add
router.post("/favorites/add", authenticateToken, async (req: Request, res: Response): Promise<void> => {
    try {
        const { foodId } = req.body;
        // @ts-ignore
        const userId = req.user.userId; // Use userId consistently

        console.log("🍕 Adding favorite - User ID:", userId, "Food ID:", foodId);

        // Fetch current favorites
        const { data: userData, error: fetchError } = await supabase
            .from("users")
            .select("favoriteMenuItems")
            .eq("userID", userId) // Keep consistent with your DB schema
            .single();

        if (fetchError) {
            console.error("❌ Failed to fetch favorites:", fetchError.message);
            res.status(500).json({ error: fetchError.message });
            return;
        }

        const currentFavorites = userData.favoriteMenuItems || [];

        // Check if already favorited
        if (currentFavorites.includes(foodId.toString())) {
            console.log(`ℹ️ User ${userId} already favorited food ${foodId}`);
            res.status(200).json({ message: "Already favorited" });
            return;
        }

        // Add to favorites
        const updatedFavorites = [...currentFavorites, foodId.toString()];

        const { error: updateError } = await supabase
            .from("users")
            .update({ favoriteMenuItems: updatedFavorites })
            .eq("userID", userId);

        if (updateError) {
            console.error("❌ Failed to update favorites:", updateError.message);
            res.status(500).json({ error: updateError.message });
            return;
        }

        console.log(`✅ Added food ${foodId} to favorites for user ${userId}`);
        res.status(200).json({
            message: "Added to favorites",
            favorites: updatedFavorites
        });
    } catch (err) {
        console.error("🔥 Uncaught /favorites/add error:", err);
        res.status(500).json({ error: "Internal error" });
    }
});

// DELETE /menu/favorites/remove
router.delete("/favorites/remove", authenticateToken, async (req: Request, res: Response): Promise<void> => {
    try {
        const { foodId } = req.body;
        // @ts-ignore
        const userId = req.user.userId;

        console.log("🗑️ Removing favorite - User ID:", userId, "Food ID:", foodId);

        // Fetch current favorites
        const { data: userData, error: fetchError } = await supabase
            .from("users")
            .select("favoriteMenuItems")
            .eq("userID", userId)
            .single();

        if (fetchError) {
            console.error("❌ Failed to fetch favorites:", fetchError.message);
            res.status(500).json({ error: fetchError.message });
            return;
        }

        const currentFavorites = userData.favoriteMenuItems || [];

        // Check if item is actually favorited
        if (!currentFavorites.includes(foodId.toString())) {
            console.log(`ℹ️ User ${userId} hasn't favorited food ${foodId}`);
            res.status(200).json({ message: "Not in favorites" });
            return;
        }

        // Remove from favorites
        const updatedFavorites = currentFavorites.filter((id: any) => id !== foodId.toString());

        const { error: updateError } = await supabase
            .from("users")
            .update({ favoriteMenuItems: updatedFavorites })
            .eq("userID", userId);

        if (updateError) {
            console.error("❌ Failed to update favorites:", updateError.message);
            res.status(500).json({ error: updateError.message });
            return;
        }

        console.log(`✅ Removed food ${foodId} from favorites for user ${userId}`);
        res.status(200).json({
            message: "Removed from favorites",
            favorites: updatedFavorites
        });
    } catch (err) {
        console.error("🔥 Uncaught /favorites/remove error:", err);
        res.status(500).json({ error: "Internal error" });
    }
});

// GET /menu/favorites - Get user's favorites
router.get("/favorites", authenticateToken, async (req: Request, res: Response): Promise<void> => {
    try {
        // @ts-ignore
        const userId = req.user.userId;

        console.log("📋 Fetching favorites for user:", userId);

        const { data: userData, error } = await supabase
            .from("users")
            .select("favoriteMenuItems")
            .eq("userID", userId)
            .single();

        if (error) {
            console.error("❌ Failed to fetch favorites:", error.message);
            res.status(500).json({ error: error.message });
            return;
        }

        const favorites = userData.favoriteMenuItems || [];
        console.log(`✅ User ${userId} has ${favorites.length} favorites`);

        res.status(200).json({ favorites });
    } catch (err) {
        console.error("🔥 Uncaught /favorites error:", err);
        res.status(500).json({ error: "Internal error" });
    }
});


export default router;