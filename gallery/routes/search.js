var express = require('express');
const {searchingThumbsInfo} = require('../helpers/thumbs-info');
var router = express.Router();

/* GET search phrase in DB. */
router.get('/:phrase', function(req, res, next) {

    const phraseList = req.params.phrase.split('+');

    searchingThumbsInfo(1, phraseList, (payload) => {
        if (!payload) {
            res.status(404);
            res.render('404');
        } else {
            
          payload.titlePage = phraseList.join(' ');
          payload.searchPattern = req.params.phrase;
          res.render('index', payload);
        }
    });
  
  });
  
  /* GET search/<type>/page/<number> page. */
  router.get('/:phrase/page/:indexPage', function(req, res, next) {
  
    const phraseList = req.params.phrase.split('+');
  
    searchingThumbsInfo(req.params.indexPage, phraseList, (payload) => {
      if (!payload) {
          res.status(404);
          res.render('404');
      } else {
        payload.titlePage = phraseList.join(' ');
        payload.searchPattern = req.params.phrase;
        res.render('index', payload);
      }
    });
  
 });

module.exports = router;
