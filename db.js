import mysql from "mysql2";
const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "web2_project",
  port: process.env.DB_PORT || 3306,
  ssl: process.env.DB_HOST && process.env.DB_HOST !== "localhost" ? { rejectUnauthorized: false } : false,
});
db.getConnection((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

export default db;