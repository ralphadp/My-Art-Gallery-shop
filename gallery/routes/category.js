var express = require('express');
const category = require('../helpers/category-info');
const thumbsPage = require('../helpers/thumbs-info');
var router = express.Router();

/* GET category/<type> page. */
router.get('/:categoryName', function(req, res, next) {

  const categoryCode = req.params.categoryName;

  thumbsPage(1, categoryCode, (payload) => {
      if (!payload) {
          res.status(404);
          res.render('404');
      } else {
        payload.titlePage = category.fromPathToName(categoryCode);
        res.render('index', payload);
      }
  });

});

/* GET category/<type>/page/<number> page. */
router.get('/:categoryName/page/:indexPage', function(req, res, next) {

  const categoryCode = req.params.categoryName;

  thumbsPage(req.params.indexPage, categoryCode, (payload) => {
    if (!payload) {
        res.status(404);
        res.render('404');
    } else {
      payload.titlePage = category.fromPathToName(categoryCode);
      res.render('index', payload);
    }
  });

});

module.exports = router;
