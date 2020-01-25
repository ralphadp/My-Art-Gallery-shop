var express = require('express');
var pjson = require('../package.json');
var router = express.Router();

/* GET root service. */
router.get('/', function(req, res, next) {
  res.send(`Images Service v.${pjson.version}`);
});

module.exports = router;
