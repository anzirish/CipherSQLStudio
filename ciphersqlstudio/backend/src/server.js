import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import { authRouter } from "./routes/authRoutes.js";
import { assignmentRouter } from "./routes/assignmentRoutes.js";
import { hintsRouter } from "./routes/hintRoutes.js";
import { queryRouter } from "./routes/queryRoutes.js";
import { feedDatabase } from "./db/mockData.js";

dotenv.config();

const app = express();

// middlewares
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173" }));
app.use(express.json());

const startServer = async () => {
  connectDB();
  feedDatabase();
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log("Server is running locally");
  });
};

// connect mongodb database
connectDB();

// Routes
app.use("/api/auth", authRouter);
app.use("/api/assignment", assignmentRouter);
app.use("/api/hints", hintsRouter);
app.use("/api/query", queryRouter);

app.get("/api", (req, res) => {
  res.status(200).json({ success: true, message: "API is running" });
});

startServer();
