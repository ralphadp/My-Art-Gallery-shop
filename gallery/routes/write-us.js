var express = require('express');
var tokenCheck = require('../model/tokenCheck');
const {keys, middlewareManager} = require('../model/middleware/manager');
const service = require('../model/servicesPath');
var router = express.Router();

/* GET write us Page. */
router.get('/', tokenCheck, function(req, res, next) {

    middlewareManager({
      key: keys.WRITEUS,
      currentUser: req.session,
      resolve: (error, payload) => {

          if (error) {
              res.locals.message = 'Error';
              res.locals.error = payload;
              res.status(500);
              res.render('error', {message:'not found', error: "error", status: 404, service: service});
          }
          payload.service = service;
          res.render('write', payload);
      }
  });
});

module.exports = router;
