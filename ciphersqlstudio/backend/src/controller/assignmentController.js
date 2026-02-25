import { pool } from "../config/postgres.js";
import { Assignment } from "../models/Assignment.js";

// get all assignments
export const getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({});
    res.status(200).json(assignments);
  } catch {
    res.status(500).json({ error: "Failed to get assignments" });
  }
};

// get assignments by id
export const getAssignmnetById = async (req, res) => {
  try {
    const assignmentId = req.params.id;
    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
      return res
        .status(400)
        .json({ error: "Assignment not found with this id" });
    }

    const sampleData = {};

    for (const tableName of assignment.sampleDataTables) {
      const result = await pool.query(`SELECT * from ${tableName}`);
      sampleData[tableName] = result.rows;
    }

    res.status(200).json({ assignment, sampleData });
  } catch {
    res.status(500).json({ error: "Failed to get assignment" });
  }
};
