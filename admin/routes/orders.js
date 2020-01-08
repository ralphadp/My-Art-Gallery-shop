var express = require('express');
var tokenCheck = require('../model/tokenCheck');
var {orders} = require('galleryRepository');
var router = express.Router();

/* GET Orders listing. */
router.get('/transactions', tokenCheck, function(req, res, next) {
  const order = new orders();
  order.getAll().then(result => {
      res.render(
        'orders', 
        { 
          title: 'Trading', 
          tableTitle: 'Transactions', 
          data: result
        }
      );
  });
});

module.exports = router;
