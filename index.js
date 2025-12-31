import db from "./db.js"; 
import cors from "cors";
import express from "express";
import userRoutes from "./user.js";
import courseRoutes from "./course.js";
import reportRoutes from "./report.js";
import selectedCourseRoutes from "./selected_courses.js";
const app = express();

// CORS configuration
app.use(cors({
  origin: '*', // Allow all origins, or replace with your Vercel domain: 'https://your-app.vercel.app'
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use("/users", userRoutes);
app.use("/courses", courseRoutes);
app.use("/reports", reportRoutes);
app.use("/selectedcourses", selectedCourseRoutes);

// Use Railway's PORT environment variable or default to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

