import db from "./db.js"; 
import express from "express";
const app = express.Router();
export default app;
//get all reports
app.get("/getreports", (req, res) => {
const q = "SELECT * FROM report";
  db.query(q, (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    } else {
      if (data.length === 0) {
        return res.status(204).send("No reports found");
      }
      return res.status(200).json(data);
    }
  });
});
//add new report
app.post("/addreports", (req, res) => {
  if (!req.body) {
    return res.status(400).send("Request body is missing");
  }

  const { name, email, message } = req.body;

  const errors = [];
    if (!name) {
    errors.push("Name is required");
  }
  if (!email) {
    errors.push("Email is required");
  }
  if (!message) {
    errors.push("Message is required");
  }
  
  if (errors.length > 0) {
    return res.status(400).json({ message: errors });
  }
  const q =
    "INSERT INTO report (name, email, message) VALUES (?, ?, ?)";

  db.query(q, [name, email, message], (err, data) => {
    if (err) {
      if (err.errno === 1062) {
        return res.status(400).json({ message: err.sqlMessage });
      }
      return res.status(500).json({ message: "Database error", error: err });
    } else {
      return res.status(201).json({
        message: "Report has been sent successfully",
     

        
      });
    }
  });
});

//delete report by name
app.delete("/deletereport/:name", (req, res) => {
  const { name } = req.params;
  if (!name) {
    return res.status(400).json({ message: "Report name is required" });
  }

  const q = "DELETE FROM report WHERE name = ?";

  db.query(q, [name], (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    } else {
      if (data.affectedRows === 0) {
        return res.status(404).json({ message: "Report not found" });
      }
      return res.status(200).json({ message: "Report deleted successfully" });
    }
  });
});