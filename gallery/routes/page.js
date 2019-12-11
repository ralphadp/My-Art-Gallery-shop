var express = require('express');
const thumbsPage = require('../helpers/thumbs-info');
var router = express.Router();

/* GET page{index} Page. */
router.get('/:indexPage', function(req, res, next) {

  thumbsPage(req.params.indexPage, 'all', (payload) => {
    if (!payload) {
        res.status(404);
        res.render('404');
    }

    res.render('index', payload);
  });
});

module.exports = router;
