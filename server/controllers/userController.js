const User = require('../models/user');

exports.getUserDetails = (req, res) => {
  const userId = req.login.id; // Assuming the user ID is stored in req.login after authentication

  User.findById(userId)
    .populate('tasks_created')
    .populate('tasks_accepted')
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
      const { password, ...userData } = user.toObject();
      res.json(userData);
    })
    .catch((err) =>
      res.status(500).json({ error: 'Error fetching user details.' })
    );
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user details' });
  }
};
