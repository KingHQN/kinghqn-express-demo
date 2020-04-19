var express = require('express');
var multer = require('multer');

var controllers = require('../controllers/user.controllers');
var validate = require('../validate/users.validate');

var upload = multer({ dest: './public/uploads/' });

var router = express.Router();

router.get('/', controllers.index);

router.get('/view/:id', controllers.get);

router.get('/search', controllers.search);

router.get('/create', controllers.create);
router.post('/create', upload.single('avatar'), validate.postCreate, controllers.postCreate);

router.get('/edit/:id', controllers.edit);
router.post('/edit/:id', upload.single('avatar'), controllers.postEdit);

router.get('/delete/:id', controllers.delete);

module.exports = router;