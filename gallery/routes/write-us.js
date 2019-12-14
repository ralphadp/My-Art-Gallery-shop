var express = require('express');
const manager = require('../middleware/manager');
var router = express.Router();

/* GET write us Page. */
router.get('/', function(req, res, next) {

  manager(1, 'all', null, (error, payload) => {

    if (error) {
        res.locals.message = 'Error';
        res.locals.error = payload;
        res.status(500);
        res.render('error', {message:'not found', error: "error", status: 404});
    }
    res.render('write', payload);
  });
});

module.exports = router;
