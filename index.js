var express = require('express');
var app = express();

var port = 3000;

app.get('/', function(req, res) {
	response.send('<h1>Hello World!</h1><a href="/users">User list</a>');
});

app.get('/users', function(req, res) {
	response.send('User list');
});

app.listen(port, function() {
	console.log('Example app listening at http://localhost:' + port);
});