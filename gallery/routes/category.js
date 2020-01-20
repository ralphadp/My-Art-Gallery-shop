var express = require('express');
var tokenCheck = require('../helpers/tokenCheck');
const {fromCategoryPathToCategoryName} = require('../helpers/middleware/tasks/util/utilities');
const {keys, middlewareManager} = require('../helpers/middleware/manager');
const service = require('../helpers/servicesPath');
var router = express.Router();

/* GET category/<type> page. */
router.get('/:categoryName', tokenCheck, function(req, res, next) {

  const categoryCode = req.params.categoryName;

  middlewareManager({
      key: keys.INDEX,
      currentUser: req.session,
      category: categoryCode,
      resolve: (error, payload) => {

        if (error) {
            res.locals.message = 'Error';
            res.locals.error = payload;
            res.status(500);
            res.render('error', {message:'not found', error: "error", status: 404, service: service});
        }
        payload.titlePage = fromCategoryPathToCategoryName(categoryCode);
        payload.service = service;

        res.render('index', payload);
      }
  });

});

/* GET category/<type>/page/<number> page. */
router.get('/:categoryName/page/:indexPage', tokenCheck, function(req, res, next) {

  const categoryCode = req.params.categoryName;

  middlewareManager({
      key: keys.INDEX,
      index: req.params.indexPage,
      category: categoryCode,
      resolve: (error, payload) => {

          if (error) {
              res.locals.message = 'Error';
              res.locals.error = payload;
              res.status(500);
              res.render('error', {message:'not found', error: "error", status: 404, service: service});
          }
          payload.titlePage = fromCategoryPathToCategoryName(categoryCode);
          payload.service = service;

          res.render('index', payload);
      }
  });

});

module.exports = router;
