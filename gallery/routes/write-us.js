var express = require('express');
const {keys, middlewareManager} = require('../helpers/middleware/manager');
var router = express.Router();

/* GET write us Page. */
router.get('/', function(req, res, next) {

    middlewareManager({
      key: keys.WRITEUS,
      currentUser: req.session,
      resolve: (error, payload) => {

          if (error) {
              res.locals.message = 'Error';
              res.locals.error = payload;
              res.status(500);
              res.render('error', {message:'not found', error: "error", status: 404});
          }

          res.render('write', payload);
      }
  });
});

module.exports = router;
