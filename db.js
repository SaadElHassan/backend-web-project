import e from "cors";
import mysql from "mysql";
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "web_project",
});
export default db;