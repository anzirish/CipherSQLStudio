import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import { authRouter } from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// middlewares
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173" }));
app.use(express.json());

// connect mongodb database
connectDB();

// Routes
app.use("/api/auth", authRouter);

app.get("/api", (req, res) => {
  res.status(200).json({ success: true, message: "API is running" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is running locally");
});
