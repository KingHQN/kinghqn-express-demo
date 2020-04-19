var express = require('express');

var controllers = require('../controllers/auth.controllers');

var validate = require('../validate/auth.validate');

var router = express.Router();

router.get('/login', controllers.login);
router.post('/login', validate.postLogin, controllers.postLogin);

router.get('/logout', controllers.logout);

module.exports = router;