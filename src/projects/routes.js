const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/', controller.getProjects);
router.get('/:id', controller.getProjectById);

module.exports = router;
