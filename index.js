import db from "./db.js"; 
import cors from "cors";
import express from "express";
import studentRoutes from "./student.js";
import administratorRoutes from "./administrator.js";
import courseRoutes from "./course.js";
import reportRoutes from "./report.js";
const app = express();

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

app.use(cors());
app.use(express.json());
app.use("/students", studentRoutes);
app.use("/administrators", administratorRoutes);
app.use("/courses", courseRoutes);
app.use("/reports", reportRoutes);

