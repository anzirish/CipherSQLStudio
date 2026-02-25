import { Pool } from "pg";

let pool;

export const initializePool = () => {
  console.log("PostgreSQL Config:", {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD ? `[${typeof process.env.POSTGRES_PASSWORD}] ${process.env.POSTGRES_PASSWORD.substring(0, 3)}***` : 'UNDEFINED'
  });

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

  return pool;
};

export { pool };
