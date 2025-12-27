import db from "./db.js"; 
import express from "express";
const app = express.Router();
//get all selected courses
app.get("/getselectedcourses", (req, res) => {
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
//add new selected course
app.post("/addselectedcourse", (req, res) => {
  if (!req.body) {
    return res.status(400).send("Request body is missing");
  }

  const { name, description } = req.body;

  const errors = [];
    if (!name) {
    errors.push("course name is required");
  }
  if (!description) {
    errors.push("course description is required");
  }
  if (errors.length > 0) {
    return res.status(400).json({ message: errors });
  }
  const q =
    "INSERT INTO course (name, description) VALUES (?, ?)";

  db.query(q, [name, description], (err, data) => {
    if (err) {
      if (err.errno === 1062) {
        return res.status(400).json({ message: err.sqlMessage });
      }
      return res.status(500).json({ message: "Database error", error: err });
    } else {
      return res.status(201).json({
        message: "course added successfully",
         id: data.insertId,
        
      });
    }
  });
});
//delete selected course
app.delete("/deleteselectedcourse/:name", (req, res) => {
  const { name } = req.params;

  if (!name) {
    return res.status(400).json({ message: "Course name is required" });
  }

  const q = "DELETE FROM course WHERE name = ?";

  db.query(q, [name], (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    } else {
      if (data.affectedRows === 0) {
        return res.status(404).json({ message: "Selected course not found" });
      }
      return res.status(200).json({ message: "Selected course deleted successfully" });
    }
  });
});

export default app;