var express = require('express');
const {keys, middlewareManager} = require('../helpers/middleware/manager');
var tokenCheck = require('../helpers/tokenCheck');
var router = express.Router();

/* GET index page. */
router.get('/', tokenCheck, function(req, res, next) {

    middlewareManager({
        key: keys.INDEX,
        currentUser: req.session,
        resolve: (error, payload) => {

            if (error) {
                res.locals.message = 'Error';
                res.locals.error = payload;
                res.status(500);
                res.render('error', {message:'not found', error: "error", status: 404});
            }

            res.render('index', payload);
        }
    });

});

/* GET logout page. */
router.get('/logout', tokenCheck, function(req, res, next) {

    res.clearCookie('access_token');
    req.session.destroy();

    res.redirect('/login');

});

module.exports = router;