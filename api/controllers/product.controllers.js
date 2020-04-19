var Product = require('../../models/product.model');

module.exports.index = async function(req, res, next) {
	var products = await Product.find();
	
	res.json(products);
};

module.exports.create = async function(req, res, next) {
	var product = await Product.create(req.body);
	res.json(product);
};

module.exports.replace = async function(req, res, next) {
	var id = req.params.id;
	if(!req.file) {
		var imgpath = '';
	} else {
		var imgpath = req.file.path.split('\\').slice(1).join('\\');
	}
	var data = {
		name: req.body.name,
		image: "https://loremflickr.com/320/240",
		description: req.body.description,
	};
	var product = await Product.findByIdAndUpdate(id, { $set: data });
	res.json(product);
};

module.exports.update = async function(req, res, next) {
	var id = req.params.id;
	if(!req.file) {
		var imgpath = '';
	} else {
		var imgpath = req.file.path.split('\\').slice(1).join('\\');
	}
	var data = {
		name: req.body.name,
		image: "https://loremflickr.com/320/240",
		description: req.body.description,
	};
	var product = await Product.findByIdAndUpdate(id, { $set: data });
	res.json(product);
};

module.exports.delete = async function(req, res, next) {
	var id = req.params.id;
	var product = await Product.findByIdAndDelete(id);
	res.redirect('/products');
}