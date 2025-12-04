const express = require('express');
const router = express.Router();
const projectController = require('./controller');
const { authenticate } = require('../../middleware/middleware');

router.get('/', authenticate, projectController.getProjects);
router.get('/:id', authenticate, projectController.getProjectById);

module.exports = router;
