import express from "express";
import {
  getAllAssignments,
  getAssignmnetById,
} from "../controller/assignmentController.js";

export const assignmentRouter = express.Router();

assignmentRouter.get("/", getAllAssignments);
assignmentRouter.get("/:id", getAssignmnetById);
