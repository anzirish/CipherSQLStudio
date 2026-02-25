import { pool } from "../config/postgres.js";

// execute SQL query
export const executeQuery = async (req, res) => {
  const { query } = req.body;
  const isQueryValid = validateQuery(query.trim().toUpperCase());
  if (!isQueryValid) {
    return res.status(400).json({ error: "Query is invalid or not allowed" });
  }

  try {
    await pool.query(`SET statement_timeout = 10000`);
    const queryResult = await pool.query(query);
    res.json({
      success: true,
      rows: queryResult.rows,
      rowCount: queryResult.rowCount,
      fields: queryResult.fields?.map((field) => field.name) || [],
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Validating and sanitizing queries
const validateQuery = (query) => {
  const prohibitedKeywords = ["DELETE", "DROP", "INSERT", "UPDATE", "CREATE"];

  if (!query.startsWith("SELECT")) {
    return false;
  }

  for (const keyword of prohibitedKeywords) {
    if (query.includes(keyword)) {
      return false;
    }
  }
  return true;
};
