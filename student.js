
import db from "./db.js"; 
import express from "express";
const app = express.Router();
//get all students
app.get("/getstudents", (req, res) => {
const q = "SELECT * FROM student";
  db.query(q, (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    } else {
      if (data.length === 0) {
        return res.status(204).send("No students found");
      }
      return res.status(200).json(data);
    }
  });
});
//add new student
app.post("/addstudents", (req, res) => {
  if (!req.body) {
    return res.status(400).send("Request body is missing");
  }

  const { student_id, password, fname, lname, major } = req.body;

  const errors = [];
    if (!student_id) {
    errors.push("Student ID is required");
  }
  if (!password) {
    errors.push("Password is required");
  }
  if (!fname) {
    errors.push("First name is required");
  }
  if (!lname) {
    errors.push("Last name is required");
  }
  if (!major) {
    errors.push("Major is required");
  }
  if (errors.length > 0) {
    return res.status(400).json({ message: errors });
  }
  const q =
    "INSERT INTO student (student_id, password, fname, lname, major) VALUES (?, ?, ?, ?, ?)";

  db.query(q, [student_id, password, fname, lname, major], (err, data) => {
    if (err) {
      if (err.errno === 1062) {
        return res.status(400).json({ message: err.sqlMessage });
      }
      return res.status(500).json({ message: "Database error", error: err });
    } else {
      return res.status(201).json({
        message: "Student added successfully",


        
      });
    }
  });
});


export default app;
