var db = require('../db');

module.exports.index = function(req, res, next) {
	var page = parseInt(req.query.page) || 1; // n
	var perPage = 8; // x

	var start = (page - 1) * perPage;
	var end = page * perPage;

	var count = db.get('products').size().value();
	
	res.render('products/index', {
		products: db.get('products').value().slice(start, end),
		currentPage: page,
		totalPages: Math.ceil(count / perPage)
	});
};