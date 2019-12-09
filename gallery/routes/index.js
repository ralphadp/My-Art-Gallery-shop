var express = require('express');
const thumbsPage = require('./helpers/thumbs-info');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  const payload = thumbsPage(1);

  if (!payload) {
    res.status(404);
    res.render('404');
  }

  res.render('index', payload);
});

module.exports = router;