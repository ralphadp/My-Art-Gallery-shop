var express = require('express');
var router = express.Router();

/* GET write us Page. */
router.get('/', function(req, res, next) {
  res.render('write', { title: 'Art Shoping' });
});

module.exports = router;
