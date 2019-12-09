var express = require('express');
const thumbsPage = require('./helpers/thumbs-info');
var router = express.Router();

/* GET write us Page. */
router.get('/', function(req, res, next) {
  const payload = thumbsPage(1);

  if (!payload) {
    res.status(err.status || 500);
    res.render('error');
  }

  res.render('write', payload);
});

module.exports = router;
