import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRouter from "./routes/auth.js";
import authUserRouter from "./routes/authUser.js"
import orderRouter from "./routes/orders.js"


const app = express();

// Core middleware
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// Routes
app.use('/auth', authRouter);
app.use('/authUser',authUserRouter);
app.use('/order',orderRouter);

export default app;


