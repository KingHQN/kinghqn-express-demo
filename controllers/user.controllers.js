var shortid = require('shortid');

var User = require('../models/user.model');

var db = require('../db');

module.exports.index = async function(req, res, next) {
	var users = await User.find();
	res.render('users/index', {
		users: users
	});
};

module.exports.get = async function(req, res) {
	var id = req.params.id;

	var user = await User.findById(id);
	res.render('users/view', {
		user: user
	});
};

module.exports.search = async function(req, res) {
	var q = req.query.q;
	var users = await User.find();
	var matchedUsers = users.filter(function(user) {
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1 || user.phone.indexOf(q) !== -1;
	});
	res.render('users/index', {
		users: matchedUsers,
		values: q
	});
};

module.exports.create = function(req, res) {
	res.render('users/create');
};

module.exports.postCreate = async function(req, res) {
	req.body.avatar = req.file.path.split('\\').slice(1).join('\\');
	var data = {
		name: req.body.name,
		phone: req.body.phone,
		avatar: req.body.avatar,
	};

	var user = await User.create(data);
	res.redirect('/users');
};

module.exports.edit = async function(req, res) {
	var id = req.params.id;
	var user = await User.findById(id);
	res.render('users/edit', {
		user: user
	});
};

module.exports.postEdit = async function(req, res) {
	var id = req.params.id;
	if(!req.file) {
		var imgpath = '';
	} else {
		var imgpath = req.file.path.split('\\').slice(1).join('\\');
	}
	var user = await User.findByIdAndUpdate(id, { $set: { name: req.body.name, phone: req.body.phone, avatar: imgpath }});
	res.redirect('/users');
};

module.exports.delete = async function(req, res) {
	var id = req.params.id;
	var user = await User.findByIdAndDelete(id);
	res.redirect('/users');
};
