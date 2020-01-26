var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();

var serviceRouter = require('./routes/service');
var thumbRouter = require('./routes/thumb');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'private')));

app.use('/', serviceRouter);
app.use('/api', thumbRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  
  const error = {
    status: err.status || 500,
    error: err.message
  }
  res.send(error);
});

module.exports = app;
