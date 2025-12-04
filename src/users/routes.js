const express = require('express');
const router = express.Router();
const userController = require('./controller');
const { authenticate } = require('../../middleware/middleware');

router.get('/', authenticate, userController.getUsers);
router.get('/:id', authenticate, userController.getUserById);

module.exports = router;
