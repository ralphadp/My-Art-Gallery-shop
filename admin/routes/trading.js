var express = require('express');
var trades = require('../repository/repo-cart');
var router = express.Router();

/* GET Trading listing. */
router.get('/', function(req, res, next) {
  const trade = new trades();
  trade.getAll().then((result) => {
      res.render(
        'trading', 
        { 
          title: 'List of Trading', 
          tableTitle: 'Trading', 
          data: result 
        }
      );
  });
});

/* GET Trading 'statistics'. */
router.get('/statistics', function(req, res, next) {
  res.render('trading-stat', { title: 'Trading', titleForm:'Statistics', data: trade });
});

module.exports = router;
