var express = require('express');
var router = express.Router();

/* GET root service. */
router.get('/', function(req, res, next) {
  res.send('Not accesss to this point.');
});

module.exports = router;
