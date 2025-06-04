// src/index.ts
import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import menuRoutes from "./routes/menuRoutes";
import authRoutes from "./routes/authRoutes"; // <-- import auth routes

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// No-cache middleware
app.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    next();
});

// Root health check
app.get("/", (_req: Request, res: Response) => {
    res.send("Taqueria Cinco de Mayo Backend (TypeScript) is up and running");
});

// Mount menu routes
app.use("/menu", menuRoutes);

// Mount auth routes
app.use("/auth", authRoutes);

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
