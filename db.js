import mysql from "mysql";
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "web2_project",
});
db.getConnection((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

export default db;