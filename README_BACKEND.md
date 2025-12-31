# backend-web-project

This repository contains the backend Node.js API for the students portal web project presented in the "web_project" repository. It provides REST API endpoints for managing students, courses, course registrations, and reports.

**Tech Stack:**
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** SQL (using custom db module)
- **HTTP Client:** axios
- **Server:** Express server with CORS support

**Key Features:**
- **Role-based API Endpoints:** Separate endpoints for student and admin operations
- **Database Integration:** SQL database connectivity for persistent data storage
- **Course Management:** CRUD operations for courses (admin only)
- **Student Management:** CRUD operations for students (admin only)
- **Course Registration:** Students can register and unregister from courses
- **Reports:** Generate and manage student and course reports

**Project structure (important files):**
- `index.js` — main Express server entry point with route handlers
- `db.js` — database connection and SQL query utilities
- `user.js` — user authentication and management endpoints
- `course.js` — course management endpoints
- `selected_courses.js` — course registration/enrollment endpoints
- `report.js` — report generation and management endpoints
- `package.json` — project dependencies and scripts

**API Endpoints**

*Authentication:*
- `POST /login` — authenticate user and return user role and ID

*Student Endpoints (role=1):*
- `GET /student/courses` — retrieve available courses for registration
- `POST /student/register` — register student in a course
- `GET /student/registered` — get list of courses student is registered for
- `DELETE /student/register/:courseId` — unregister from a course
- `GET /student/reports` — retrieve student reports

*Admin Endpoints (role=2):*
- `GET /admin/students` — retrieve all students
- `POST /admin/student` — add a new student
- `DELETE /admin/student/:studentId` — delete a student
- `GET /admin/courses` — retrieve all courses
- `POST /admin/course` — add a new course
- `DELETE /admin/course/:courseId` — delete a course
- `GET /admin/reports` — retrieve all reports
- `DELETE /admin/report/:reportId` — delete a report

**Setup & Run (local)**
Prerequisites: Node.js and npm.

1. Clone the repo:

	`git clone <repo-url>`

2. Install dependencies:

	`npm install`

3. Configure environment variables:

	Create a `.env` file in the project root and add:
	```
	DB_HOST=<your-database-host>
	DB_USER=<your-database-user>
	DB_PASSWORD=<your-database-password>
	DB_NAME=<your-database-name>
	PORT=<server-port (default: 5000)>
	```

4. Start the development server:

	`npm start`

	This starts the backend server at `http://localhost:5000` by default.

5. Run tests:

	`npm test`
