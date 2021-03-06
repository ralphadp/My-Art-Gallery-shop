var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

require('dotenv').config();
const service = require('./model/servicesPath');

var optionsUpdate = require('./model/optionsUpdate');
var indexRouter = require('./routes/index');
var learningRouter = require('./routes/learning');
var writeUsRouter = require('./routes/write-us');
var pageRouter = require('./routes/page');
var cartRouter = require('./routes/cart');
var categoryRouter = require('./routes/category');
var emailerRouter = require('./routes/emailer');
var searchRouter = require('./routes/search');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var boughtRouter = require('./routes/bought');
var remoteRouter = require('./routes/remote');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	secret: 'galleryArtSession', 
	resave: true,
	saveUninitialized: true
}));

optionsUpdate();

app.use('/', indexRouter);
app.use('/learning', learningRouter);
app.use('/write-us', writeUsRouter);
app.use('/page', pageRouter);
app.use('/cart', cartRouter);
app.use('/category', categoryRouter);
app.use('/send-message', emailerRouter);
app.use('/search', searchRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/bought', boughtRouter);
app.use('/remote', remoteRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.title = (err.status === 404) ? 'Page Not found' : 'Error';
  res.locals.currentUser = req.session;
  res.locals.message = err.message;
  res.locals.service = service;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
