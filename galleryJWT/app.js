var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');

// JWT Art Gallery API
// sample: 
// http://localhost:3333/api/generate/susan.32@gmail.com/expiration/12h
// http://localhost:3333/api/check/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN1c2FuLjMyQGdtYWlsLmNvbSIsImlhdCI6MTU3NzkwNTAwNywiZXhwIjoxNTc3OTQ4MjA3fQ.4kRl81LxO0mlBg0qw8zV1HZJlefK0xvgBxqehAoQa2U

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
