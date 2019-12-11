var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

global.currentUser = "03-028-2484";

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var learningRouter = require('./routes/learning');
var writeUsRouter = require('./routes/write-us');
var pageRouter = require('./routes/page');
var cartRouter = require('./routes/cart');
var categoryRouter = require('./routes/category');
var emailerRouter = require('./routes/emailer');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/learning', learningRouter);
app.use('/write-us', writeUsRouter);
app.use('/page', pageRouter);
app.use('/cart', cartRouter);
app.use('/category', categoryRouter);
app.use('/send-message', emailerRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
