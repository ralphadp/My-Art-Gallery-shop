var express = require('express');
const manager = require('../middleware/manager');
var router = express.Router();

/* GET page{index} Page. */
router.get('/:indexPage', function(req, res, next) {

  manager(req.params.indexPage, 'all', null, (error, payload) => {

    if (error) {
        res.locals.message = 'Error';
        res.locals.error = payload;
        res.status(500);
        res.render('error', {message:'not found', error: "error", status: 404});
    }

    res.render('index', payload);
  });
});

module.exports = router;
