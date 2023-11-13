const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { requireLogin } = require('../controllers/auth_controller');

router.get('/', requireLogin, userController.getUserDetails);

module.exports = router;
