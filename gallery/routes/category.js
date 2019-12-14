var express = require('express');
const category = require('../helpers/category-info');
const manager = require('../middleware/manager');
var router = express.Router();

/* GET category/<type> page. */
router.get('/:categoryName', function(req, res, next) {

  const categoryCode = req.params.categoryName;

  manager(1, categoryCode, null, (error, payload) => {

      if (error) {
          res.locals.message = 'Error';
          res.locals.error = payload;
          res.status(500);
          res.render('error', {message:'not found', error: "error", status: 404});
      }
      payload.titlePage = category.fromPathToName(categoryCode);
      res.render('index', payload);
  });

});

/* GET category/<type>/page/<number> page. */
router.get('/:categoryName/page/:indexPage', function(req, res, next) {

  const categoryCode = req.params.categoryName;

  manager(req.params.indexPage, categoryCode, null, (error, payload) => {

      if (error) {
          res.locals.message = 'Error';
          res.locals.error = payload;
          res.status(500);
          res.render('error', {message:'not found', error: "error", status: 404});
      }
      payload.titlePage = category.fromPathToName(categoryCode);
      res.render('index', payload);
  });

});

module.exports = router;
