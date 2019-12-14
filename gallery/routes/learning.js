var express = require('express');
const manager = require('../middleware/manager');
var router = express.Router();

/* GET learning page. */
router.get('/', function(req, res, next) {

  manager(1, 'all', null, (error, payload) => {

    if (error) {
        res.locals.message = 'Error';
        res.locals.error = payload;
        res.status(500);
        res.render('error', {message:'not found', error: "error", status: 404});
    }
    payload.titlePage = 'Learn about Art';
    res.render('learn', payload);
  });

});

module.exports = router;
