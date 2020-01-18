var express = require('express');
var router = express.Router();

/* GET root service. */
router.get('/', function(req, res, next) {
  res.send('Images Service v.0.0.3');
});

module.exports = router;
