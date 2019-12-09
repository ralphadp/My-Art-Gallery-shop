var express = require('express');
const thumbsPage = require('./helpers/thumbs-info');
var router = express.Router();

/* GET learning page. */
router.get('/', function(req, res, next) {

  const payload = thumbsPage(1);

  if (!payload) {
    res.status(err.status || 500);
    res.render('error');
  }

  payload.titlePage = 'Learn about Art';

  res.render('learn', payload);
});

module.exports = router;
