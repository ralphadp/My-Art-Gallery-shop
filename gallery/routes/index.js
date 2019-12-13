var express = require('express');
const {thumbsInfo} = require('../helpers/thumbs-info');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    thumbsInfo(1, 'all', (payload) => {
        if (!payload) {
            res.status(404);
            res.render('404');
        }

        res.render('index', payload);
    });

});

module.exports = router;
