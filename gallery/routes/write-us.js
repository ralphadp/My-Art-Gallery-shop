var express = require('express');
const {thumbsInfo} = require('../helpers/thumbs-info');
var router = express.Router();

/* GET write us Page. */
router.get('/', function(req, res, next) {

  thumbsInfo(1, 'all', (payload) => {
    if (!payload) {
        res.status(404);
        res.render('404');
    }

    res.render('write', payload);
  });
});

module.exports = router;
