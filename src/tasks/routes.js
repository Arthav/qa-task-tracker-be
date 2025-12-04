const express = require('express');
const router = express.Router();
const taskController = require('./controller');
const { authenticate } = require('../../middleware/middleware');

router.get('/', authenticate, taskController.getTasks);
router.get('/:id', authenticate, taskController.getTaskById);
router.post('/', authenticate, taskController.createTask);
router.put('/:id', authenticate, taskController.updateTask);
router.post('/:id/repair-loops', authenticate, taskController.addRepairLoop);

module.exports = router;
