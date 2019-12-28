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
          title: 'List of Possible Trading', 
          tableTitle: 'Carts', 
          data: result 
        }
      );
  });
});

/* GET Trading 'statistics'. */
router.get('/statistics', function(req, res, next) {

  const cart = new carts();

  cart.getCountByYear().then((result) => {

      /* Convert a array of object to array of arrays */
      let cartByYear = result.map(function(object) {
          let item = [];
          item.push(object.Year);
          item.push(object.Picked);
          return item;
      });

      let linearCartByYear = [['x'],['Year']];
      result.forEach(function(object) {
        linearCartByYear[0].push(object.Year);
        linearCartByYear[1].push(object.Picked);
      });

      res.render(
        'trading-stat', 
        { 
          title: '(Carts) Possible Trading', 
          titleFormStat1: 'Statistics by year', 
          titleFormStat2: 'Linear view by Year', 
          data: {
            cartByYear: JSON.stringify(cartByYear),
            linearCartByYear: JSON.stringify(linearCartByYear)
          }
        }
      );
  });

});

module.exports = router;
