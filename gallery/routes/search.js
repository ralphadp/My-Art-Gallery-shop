var express = require('express');
var tokenCheck = require('../helpers/tokenCheck');
const {keys, middlewareManager} = require('../helpers/middleware/manager');
const service = require('../helpers/servicesPath');
var router = express.Router();

/* GET search phrase in DB. */
router.get('/:phrase', tokenCheck, function(req, res, next) {

    const phraseList = req.params.phrase.split('+');

    middlewareManager({
        key: keys.SEARCHING,
        wordPattern: phraseList,
        currentUser: req.session, 
        resolve: (error, payload) => {

            if (error) {
                res.locals.message = 'Error';
                res.locals.error = payload;
                res.status(500);
                res.render('error', {message:'not found', error: "error", status: 404, service: service});
            }
            payload.service = service;
            payload.titlePage = phraseList.join(' ');
            payload.searchPattern = req.params.phrase;

            res.render('index', payload);
        }
    });
  
});
  
/* GET search/<type>/page/<number> page. */
router.get('/:phrase/page/:indexPage', function(req, res, next) {

    const phraseList = req.params.phrase.split('+');

    middlewareManager({
        key: keys.SEARCHING,
        index: req.params.indexPage,
        wordPattern: phraseList, 
        resolve: (error, payload) => {

            if (error) {
                res.locals.message = 'Error';
                res.locals.error = payload;
                res.status(500);
                res.render('error', {message:'not found', error: "error", status: 404, service: service});
            }
            payload.service = service;
            payload.titlePage = phraseList.join(' ');
            payload.searchPattern = req.params.phrase;

            res.render('index', payload);
        }
    });

});

module.exports = router;
