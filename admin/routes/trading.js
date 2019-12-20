var express = require('express');
var trade = require('../repository/trading');
var router = express.Router();

/* GET Trading listing. */
router.get('/', function(req, res, next) {
  res.render('trading', { title: 'Trading', tableTitle: 'Trading', data: trade });
});

/* GET Trading 'statistics'. */
router.get('/statistics', function(req, res, next) {
  res.render('trading-stat', { title: 'Trading', titleForm:'Statistics', data: trade });
});

module.exports = router;
