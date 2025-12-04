const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/', controller.getTasks);
router.get('/:id', controller.getTaskById);
router.post('/', controller.createTask);
router.put('/:id', controller.updateTask);
router.post('/:id/repair-loops', controller.addRepairLoop);

module.exports = router;
