// src/index.ts
import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import menuRoutes from "./routes/menuRoutes";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const app = express();

// Enhanced CORS configuration
const allowedOrigins = process.env.FRONTEND_URL
    ? process.env.FRONTEND_URL.split(',')
    : ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5175'];

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'Authorization',
        'Cache-Control'
    ],
    credentials: true
}));

app.use(express.json());

// No-cache middleware
app.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    next();
});

// Request logging middleware
app.use((req, res, next) => {
    console.log(`📡 ${req.method} ${req.path} - Origin: ${req.headers.origin}`);
    if (req.headers.authorization) {
        console.log(`🔑 Auth header present: ${req.headers.authorization.substring(0, 20)}...`);
    }
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
    console.log(`CORS enabled for origins: ${allowedOrigins.join(', ')}`);
});