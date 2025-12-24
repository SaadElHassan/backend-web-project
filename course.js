import db from "./db.js"; 
import express from "express";
const app = express.Router();
app.get("/getcourses", (req, res) => {
  const q = "SELECT * FROM course";

  db.query(q, (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    } else {
      if (data.length === 0) {
        return res.status(204).send("No course found");
      }
      return res.status(200).json(data);
    }
  });
});


export default app;
