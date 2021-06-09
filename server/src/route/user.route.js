const express = require('express');
const router = express.Router();
const UserController = require('../controller/user.controller.js');
const {authenticate} = require('../middleware.js');
const awaitHandlerFactory = require('../awaitHandler.js');
const userController = require('../controller/user.controller.js');
const {AuthType} = require('../utils.min.js');

router.get('/user', authenticate(AuthType.cookie), awaitHandlerFactory(UserController.getUsers));
router.post('/user/create', awaitHandlerFactory(UserController.createUser));
router.post('/user/login', awaitHandlerFactory(UserController.userLogin));
router.get('/user/state', awaitHandlerFactory(userController.isUserAlive));
router.get('/user/logout', awaitHandlerFactory(UserController.userLogOut));

module.exports = router;