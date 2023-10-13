const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getMyTasks,
  acceptTask,
  closeTask,
} = require("../controllers/taskController");

// Create a new task
router.post("/create", createTask);

// Fetch all tasks
router.get("/", getTasks);

// Fetch a specific task by its ID
router.get("/:taskId", getTaskById);

//Fetch tasks accepted and completed by user
router.get("/mytasks", getMyTasks);

// Update a specific task by its ID
router.put("/:taskId", updateTask);

//Accept a task
router.put("/accept/:taskId", acceptTask);

//Close a task
router.put("/close/:taskId", closeTask);

// Delete a task by its ID
router.delete("/:taskId", deleteTask);

module.exports = router;
