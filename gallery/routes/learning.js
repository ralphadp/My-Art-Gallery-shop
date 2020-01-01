var express = require('express');
const {keys, middlewareManager} = require('../helpers/middleware/manager');
var router = express.Router();

/* GET learning page. */
router.get('/', function(req, res, next) {

    middlewareManager({
      key: keys.LEARNING,
      currentUser: req.session,
      resolve: (error, payload) => {

          if (error) {
              res.locals.message = 'Error';
              res.locals.error = payload;
              res.status(500);
              res.render('error', {message:'not found', error: "error", status: 404});
          }
          payload.titlePage = 'Learn about Art';
          res.render('learn', payload);
      }
  });

});

module.exports = router;
