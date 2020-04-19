var db = require('../db');

var shortid = require('shortid');

module.exports = function(req, res, next) {
	var sessionId = shortid.generate();
	if(!req.signedCookies.sessionId) {
		res.cookie('sessionId', sessionId, {
			signed: true
		});
		db.get('sessions').push({ id: sessionId }).write();
	}
	var obj = db.get('sessions').find({ id: req.signedCookies.sessionId }).get('cart').value();
	var countCartNumbers = 0;
	if(obj) {
		for(var i = 0; i < Object.getOwnPropertyNames(obj).length; i++) {
			countCartNumbers += Object.values(obj)[i];
		}
	}
	
	res.cookie('totalCart', countCartNumbers, {
		signed: false
	});
	next();
};