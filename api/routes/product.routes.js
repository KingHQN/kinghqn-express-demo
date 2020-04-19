var express = require('express');

var controllers = require('../controllers/product.controllers');

var router = express.Router();

router.get('/', controllers.index);
router.post('/', controllers.create);
router.put('/replace/:id', controllers.replace);
router.patch('/update/:id', controllers.update);
router.delete('/delete/:id', controllers.delete);

module.exports = router;