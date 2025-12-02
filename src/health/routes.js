const express = require('express');

const controller = require('./controller/index');

const router = express.Router();

router.get('/', controller.getStatus);

router.get('/db', controller.getDBStatus);

router.get('/generate-jwt', controller.generateJwt);

module.exports = router;