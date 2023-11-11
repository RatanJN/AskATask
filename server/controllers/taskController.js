const Task = require("../models/task");
const User = require("../models/user");

// Create a new task
exports.createTask = (req, res) => {
  const userId = req.login.id; // Or however you're getting the authenticated user's ID

  // Create a new task with the user's ID as the creator
  const newTask = new Task({
    ...req.body,
    created_by: userId,
  });

  // Save the new task
  newTask
    .save()
    .then((task) => {
      // Now, find the user and update their tasks_created array
      User.findByIdAndUpdate(
        userId,
        { $push: { tasks_created: task._id } }, // Push the new task's ID into the tasks_created array
        { new: true, useFindAndModify: false } // Options for returning the updated user and for deprecation warnings
      )
        .then((user) => {
          if (!user) {
            return res.status(404).json({ error: "User not found." });
          }
          // Respond with the created task. You can also include the updated user data if necessary
          res.status(201).json(task);
        })
        .catch((err) => {
          Task.findByIdAndRemove(task._id).exec(); // Cleanup by removing the orphaned task
          res.status(500).json({
            error: "Task created, but user update failed.",
            details: err.message,
          });
        });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "Failed to create the task.", details: err.message });
    });
};

// Fetch all tasks
exports.getTasks = (req, res) => {
  const userId = req.login.id;

  // Get the current date at the start of the day in UTC
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0); // Set the time to 00:00:00.000

  Task.find({
    created_by: userId,
    task_date: { $gte: today }, // $gte selects those documents where the value of the field is greater than or equal to (i.e., >=) the specified value
  })
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

// Find user by ID and populate the tasks_accepted and tasks_completed fields
exports.getMyTasks = (req, res) => {
  const userId = req.login.id;
  User.findById(userId)
    .populate("tasks_accepted")
    .populate("tasks_completed")
    .then((user) => {
      res.json({
        acceptedTasks: user.tasks_accepted,
        completedTasks: user.tasks_completed,
      });
    })
    .catch((err) => res.status(500).json({ error: "Failed to fetch tasks." }));
};

// Update a specific task by its ID
exports.updateTask = (req, res) => {
  const userId = req.login.id;

  // Function to perform the actual task update
  function performUpdate() {
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

        // If task status is changed to Open, update user's tasks_accepted
        if (req.body.status === "Open") {
          User.findByIdAndUpdate(
            task.accepted_by, // assuming the task has the accepted_by field
            { $pull: { tasks_accepted: task._id } },
            { new: true, useFindAndModify: false }
          )
            .then(() => res.json(task))
            .catch((err) =>
              res.status(500).json({ error: "Failed to update user data." })
            );
        } else {
          res.json(task);
        }
      })
      .catch((err) =>
        res.status(500).json({ error: "Failed to update the task." })
      );
  }

  // Validate for status change from Active to Open
  if (req.body.status === "Open") {
    Task.findOne({
      _id: req.params.taskId,
      created_by: userId,
      status: "Active",
    })
      .then((task) => {
        if (!task) {
          return res.status(400).json({ error: "Invalid status change." });
        }
        // Proceed with update if validation passes
        performUpdate();
      })
      .catch((err) => res.status(500).json({ error: "Validation error." }));
  } else {
    // Proceed with the update if no status change to Open
    performUpdate();
  }
};

//Accept a task
exports.acceptTask = (req, res) => {
  const userId = req.login.id;

  Task.findOneAndUpdate(
    { _id: req.params.taskId, status: "Open", created_by: { $ne: userId } },
    { accepted_by: userId, status: "Active" },
    { new: true }
  )
    .then((task) => {
      if (!task) {
        return res.status(404).json({
          error:
            "Task not found, it's already accepted by someone else, or you are trying to accept your own task.",
        });
      }

      // After successfully updating the task, update the user's tasks_accepted
      User.findByIdAndUpdate(
        userId,
        { $push: { tasks_accepted: task._id } },
        { new: true, useFindAndModify: false }
      )
        .then((user) => {
          if (!user) {
            return res.status(404).json({ error: "User not found." });
          }
          res.json(task);
        })
        .catch((err) => {
          res
            .status(500)
            .json({ error: "Failed to update user's accepted tasks." });
        });
    })
    .catch((err) => {
      console.error("Error in acceptTask", err);
      res.status(500).json({ error: "Failed to accept the task." });
    });
};

//Close a task
exports.closeTask = (req, res) => {
  const userId = req.login.id;

  Task.findOneAndUpdate(
    { _id: req.params.taskId, created_by: userId },
    { status: "Closed" },
    { new: true }
  )
    .then((task) => {
      if (!task) {
        return res
          .status(404)
          .json({ error: "Task not found or not authorized to close it." });
      }

      // Check if the task was accepted by someone
      if (task.accepted_by) {
        // Remove the task from the tasks_accepted array of the user who accepted it
        User.findByIdAndUpdate(
          task.accepted_by,
          { $pull: { tasks_accepted: task._id } },
          { new: true, useFindAndModify: false }
        )
          .then(() => res.json(task))
          .catch((err) =>
            res.status(500).json({ error: "Failed to update user data." })
          );
      } else {
        res.json(task); // If no one had accepted the task, just return the task
      }
    })
    .catch((err) =>
      res.status(500).json({ error: "Failed to close the task." })
    );
};

// Delete a task by its ID
exports.deleteTask = (req, res) => {
  const userId = req.login.id;

  Task.findOne({ _id: req.params.taskId, created_by: userId })
    .then((task) => {
      if (!task) {
        return res
          .status(404)
          .json({ error: "Task not found or not authorized." });
      }

      // Function to remove the task from the Task collection
      const removeTask = () => {
        Task.findByIdAndRemove(task._id)
          .then(() => {
            // Also remove the task from the tasks_created array of the user
            User.findByIdAndUpdate(
              userId,
              { $pull: { tasks_created: task._id } },
              { new: true, useFindAndModify: false }
            )
              .then(() => res.json({ message: "Task deleted successfully." }))
              .catch((err) =>
                res.status(500).json({ error: "Failed to update user data." })
              );
          })
          .catch((err) =>
            res.status(500).json({ error: "Failed to delete the task." })
          );
      };

      // Check if the task was accepted by someone
      if (task.accepted_by) {
        // Remove the task from the tasks_accepted array of the user who accepted it
        User.findByIdAndUpdate(
          task.accepted_by,
          { $pull: { tasks_accepted: task._id } },
          { new: true, useFindAndModify: false }
        )
          .then(removeTask)
          .catch((err) =>
            res.status(500).json({ error: "Failed to update user data." })
          );
      } else {
        removeTask();
      }
    })
    .catch((err) =>
      res.status(500).json({ error: "Failed to find the task." })
    );
};
