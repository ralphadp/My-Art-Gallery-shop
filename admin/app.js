var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const {emailEventEmitter} = require('./model/emailFetcher');

require('dotenv').config();
const services = require('./model/servicesPath');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var piecesRouter = require('./routes/pieces');
var cartsRouter = require('./routes/carts');
var categoriesRouter = require('./routes/categories');
var messagesRouter = require('./routes/messages');
var ordersRouter = require('./routes/orders');

var app = express();

global.currentEmailCounter = 0;
global.version = require('./package.json').version;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'adminGalleryArtSession', 
  resave: true,
  saveUninitialized: true
}));

//just an example
function getBrowser() {
  return this.get('User-Agent'); 
}

app.use((req, res, next) => {
    req.getBrowserInfo = () => {
        return req.get('User-Agent'); 
    };
    res.renderPage = (title, result) => {
        result.services = services;
        res.render(
            title,
            result
        );
    };
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pieces', piecesRouter);
app.use('/carts', cartsRouter);
app.use('/categories', categoriesRouter);
app.use('/message', messagesRouter);
app.use('/orders', ordersRouter);

emailEventEmitter(20).on('new-email', (count) => {
  global.currentEmailCounter = count;
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.services = services;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
