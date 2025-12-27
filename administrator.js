import db from "./db.js"; 
import express from "express";
const app = express.Router();
app.get("/getadministrators", (req, res) => {
  const q = "SELECT * FROM administrator";

  db.query(q, (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    } else {
      if (data.length === 0) {
        return res.status(204).send("No administrator found");
      }
      return res.status(200).json(data);
    }
  });
});
//get administrator by id
app.get("/getadministratorrole/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Administrator ID is required" });
  }
  if (isNaN(Number(id))) {
    return res.status(400).json({ message: "Administrator ID must be a number" });
  }
  const q = "SELECT role FROM administrator WHERE admin_id = ?";

  db.query(q, [id], (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }
    else {
      if (data.length === 0) {
        return res.status(404).json({ message: "Administrator not found" });
      }
      return res.status(200).json(data[0]);
    }
  });
});

export default app;
