import db from "./db.js"; 
import cors from "cors";
import express from "express";
import userRoutes from "./user.js";
import administratorRoutes from "./administrator.js";
import courseRoutes from "./course.js";
import reportRoutes from "./report.js";
import selectedCourseRoutes from "./selected_courses.js";
const app = express();

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);
app.use("/administrators", administratorRoutes);
app.use("/courses", courseRoutes);
app.use("/reports", reportRoutes);
app.use("/selectedcourses", selectedCourseRoutes);

