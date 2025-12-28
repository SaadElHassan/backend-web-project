import db from "./db.js";
import express from "express";
const app = express.Router();
//get all students
app.get("/getstudents", (req, res) => {
  const q = "SELECT * FROM user WHERE role = 1";
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
app.post("/addstudent", (req, res) => {
  if (!req.body) {
    return res.status(400).send("Request body is missing");
  }

  const { id, password, fname, lname, major } = req.body;

  const errors = [];
  if (!id) {
    errors.push("Student ID is required");
  }
  if(!password) {
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
  if (isNaN(Number(id))) {
    return res.status(400).json({ message: "Student ID must be a number" });
  }
  if (errors.length > 0) {
    return res.status(400).json({ message: errors });
  }
  const q =
    "INSERT INTO user (id, password, fname, lname, major, role) VALUES (?,  ?, ?, ?, ?, 1)";

  db.query(q, [id, password, fname, lname, major], (err, data) => {
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

//delete student
app.delete("/deletestudents/:id", (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Student ID is required" });
  }

  if (isNaN(Number(id))) {
    return res.status(400).json({ message: "Student ID must be a number" });
  }

  const q = "DELETE FROM user WHERE id = ?";

  db.query(q, [id], (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    } else {
      if (data.affectedRows === 0) {
        return res.status(404).json({ message: "Student not found" });
      }
      return res.status(200).json({ message: "Student deleted successfully" });
    }
  });
});

//get users role by password and id
 app.post("/getusersrole", (req, res) => {
   if (!req.body) {
     return res.status(400).send("Request body is missing");
   }

   const { id, password } = req.body;

   const errors = [];
   if (!id) errors.push(" ID is required");
   if (!password) errors.push("Password is required");

   if (isNaN(Number(id))) {
     return res.status(400).json({ message: "users ID must be a number" });
   }

   if (errors.length > 0) {
     return res.status(400).json({ message: errors });
   }
   const q = "SELECT role  FROM user WHERE id = ? AND password = ?";

   db.query(q, [id, password], (err, data) => {
     if (err) {
       return res.status(500).json({ message: "Database error", error: err });
     }

     if (data.length === 0) {
       return res.sendStatus(204);
     }
     return res.status(200).json(data[0].role);
   });
 });


 export default app;
