import express from "express";
import dotenv from "dotenv";

import exampleRoutes from "./routes/example.route";
import authRoutes from "./routes/auth.routes";



dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use("/api", exampleRoutes);
app.use("/api/auth", authRoutes);

export default app;
