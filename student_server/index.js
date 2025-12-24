import cors from "cors";
import mysql from "mysql";

import express from "express";

const app = express();

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "web_project",
});