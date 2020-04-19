require('dotenv').config();

// req.query
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var csurf = require('csurf');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);

var authRoutes = require('./routes/auth.routes');
var userRoutes = require('./routes/user.routes');
var productRoutes = require('./routes/product.routes');
var cartRoutes = require('./routes/cart.routes');
var transferRoutes = require('./routes/transfer.routes');

var apiProductRoutes = require('./api/routes/product.routes');

var authMiddlewares = require('./middlewares/auth.middlewares');
var sessionMiddlewares = require('./middlewares/session.middlewares');

var port = 3000;

var app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddlewares);

app.use(express.static('public'));

app.get('/', function(req, res) {
	res.render('index', {
		name: 'AAA'
	});
});

app.use('/api/products', apiProductRoutes);

app.use('/auth', authRoutes);
app.use('/users', authMiddlewares.requireAuth, userRoutes);
app.use('/products', authMiddlewares.requireAuth, productRoutes);
app.use(csurf({ cookie: true }));
app.use('/cart', cartRoutes);
app.use('/transfer', authMiddlewares.requireAuth, transferRoutes);


app.listen(port, function() {
	console.log('Example app listening at http://localhost:' + port);
});