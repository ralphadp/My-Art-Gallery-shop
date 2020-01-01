var express = require('express');
var router = express.Router();

/* GET home route. */
router.get('/', function(req, res, next) {
  res.send('JWT Api 0.0.1');
});

module.exports = router;
