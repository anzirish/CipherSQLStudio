import express from "express";
import { executeQuery } from "../controller/queryController.js";

export const queryRouter = express.Router();

queryRouter.post("/execute", executeQuery)