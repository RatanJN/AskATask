const Task = require("../models/task");

// Create a new task
exports.createTask = (req, res) => {
  const userId = req.login.id;

  const newTask = new Task({
    ...req.body,
    created_by: userId,
  });
  newTask
    .save()
    .then((task) => res.status(201).json(task))
    .catch((err) =>
      res
        .status(500)
        .json({ error: "Failed to create the task.", details: err.message })
    );
};

// Fetch all tasks
exports.getTasks = (req, res) => {
  const userId = req.login.id;

  Task.find({ created_by: userId })
    .then((tasks) => res.json(tasks))
    .catch((err) => res.status(500).json({ error: "Failed to fetch tasks." }));
};

// Fetch a single task by its ID
exports.getTaskById = (req, res) => {
  const userId = req.login.id;

  Task.findOne({ _id: req.params.taskId, created_by: userId })
    .then((task) => {
      if (!task) {
        return res.status(404).json({ error: "Task not found." });
      }
      res.json(task);
    })
    .catch((err) =>
      res.status(500).json({ error: "Failed to fetch the task." })
    );
};

// Update a specific task by its ID
exports.updateTask = (req, res) => {
  const userId = req.login.id;

  Task.findOneAndUpdate(
    { _id: req.params.taskId, created_by: userId },
    req.body,
    { new: true }
  )
    .then((task) => {
      if (!task) {
        return res
          .status(404)
          .json({ error: "Task not found or not authorized." });
      }
      res.json(task);
    })
    .catch((err) =>
      res.status(500).json({ error: "Failed to update the task." })
    );
};

// Delete a task by its ID
exports.deleteTask = (req, res) => {
  const userId = req.login.id;

  Task.findOneAndRemove({ _id: req.params.taskId, created_by: userId })
    .then((task) => {
      if (!task) {
        return res
          .status(404)
          .json({ error: "Task not found or not authorized." });
      }
      res.json({ message: "Task deleted successfully." });
    })
    .catch((err) =>
      res.status(500).json({ error: "Failed to delete the task." })
    );
};
