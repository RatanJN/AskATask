const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  bu_email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone_number: {
    type: Number,
    required: true,
  },
  tasks_created: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
      default: [],
    },
  ],
  tasks_accepted: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
      default: [],
    },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
