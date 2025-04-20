const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const connectDB = require("./config/db");
const { registerUser, loginUser } = require("./controllers/authController");
const {
  getTasks,
  addTask,
  deleteTask,
} = require("./controllers/taskController");
const protect = require("./middleware/authMiddleware");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Root Route (move this ABOVE app.listen)
app.get("/", (req, res) => {
  res.send("Welcome to Task Manager API 💼✨");
});

// Auth Routes
app.post("/api/auth/register", registerUser);
app.post("/api/auth/login", loginUser);

// Task Routes (protected)
app.get("/api/tasks", protect, getTasks);
app.post("/api/tasks", protect, addTask);
app.delete("/api/tasks/:id", protect, deleteTask);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
