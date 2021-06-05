const express = require('express');
const userController = require('../controller/user.controller.js');
const router = express.Router();

const UserController = require('../controller/user.controller.js');

router.get('/users', userController.getUsers);

module.exports = router;