const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  category: {
    type: String,
    enum: ['Academic', 'Nonacademic'],
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  accepted_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  status: {
    type: String,
    enum: ['Open', 'Active', 'Closed'],
    default: 'Open',
  },
  task_date: {
    type: Date,
    required: true,
  },
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
