const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

// Create a new task
router.post("/create", createTask);

// Fetch all tasks
router.get("/", getTasks);

// Fetch a specific task by its ID
router.get("/:taskId", getTaskById);

// Update a specific task by its ID
router.put("/:taskId", updateTask);

// Delete a task by its ID
router.delete("/:taskId", deleteTask);

module.exports = router;
