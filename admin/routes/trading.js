var express = require('express');
var {carts} = require('galleryRepository');
var router = express.Router();

/* GET Trading listing. */
router.get('/', function(req, res, next) {
  const possibleTrades = new carts();
  possibleTrades.getAll().then((result) => {
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
  const trade = [3,6,7,4,2];
  res.render('trading-stat', { title: 'Trading', titleForm:'Statistics', data: trade });
});

module.exports = router;
