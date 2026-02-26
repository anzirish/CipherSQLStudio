import { Pool } from "pg";

let pool;

export const initializePool = () => {
  pool = new Pool({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  });

  pool.on("connect", () => {
    console.log("Postgre Sql connected");
  });

  pool.on("error", (err) => {
    console.error("PostgreSQL pool error:", err.message);
  });
};

export { pool };
