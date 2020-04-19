var express = require('express');

var controllers = require('../controllers/product.controllers');

var router = express.Router();

router.get('/', controllers.index);

// router.get('/:page', controllers.page);

module.exports = router;