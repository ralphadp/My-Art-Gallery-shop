var express = require('express');
const thumbsPage = require('../helpers/thumbs-info');
var router = express.Router();

/* GET learning page. */
router.get('/', function(req, res, next) {

  thumbsPage(1, 'all', (payload) => {
    if (!payload) {
        res.status(404);
        res.render('404');
    }
    payload.titlePage = 'Learn about Art';
    res.render('learn', payload);
});

});

module.exports = router;
