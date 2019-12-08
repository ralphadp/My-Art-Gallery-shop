var express = require('express');
var router = express.Router();

/* GET learning page. */
router.get('/', function(req, res, next) {
  res.render('learn', { title: 'Art Shoping', titlePage: 'Learn about Art' });
});

module.exports = router;
