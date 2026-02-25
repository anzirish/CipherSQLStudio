import express from "express";
import { generateHint } from "../controller/hintController.js";

export const hintsRouter = express.Router();

queryRouter.post("/generate", generateHint)