var express = require('express');
const manager = require('../middleware/manager');
var router = express.Router();

/* GET search phrase in DB. */
router.get('/:phrase', function(req, res, next) {

    const phraseList = req.params.phrase.split('+');

    manager(1, 'all', phraseList, (error, payload) => {

      if (error) {
          res.locals.message = 'Error';
          res.locals.error = payload;
          res.status(500);
          res.render('error', {message:'not found', error: "error", status: 404});
      }
      payload.titlePage = phraseList.join(' ');
      payload.searchPattern = req.params.phrase;
      res.render('index', payload);
    });
  
});
  
/* GET search/<type>/page/<number> page. */
router.get('/:phrase/page/:indexPage', function(req, res, next) {

    const phraseList = req.params.phrase.split('+');

    manager(req.params.indexPage, 'all', phraseList, (error, payload) => {

      if (error) {
          res.locals.message = 'Error';
          res.locals.error = payload;
          res.status(500);
          res.render('error', {message:'not found', error: "error", status: 404});
      }
      payload.titlePage = phraseList.join(' ');
      payload.searchPattern = req.params.phrase;
      res.render('index', payload);
    });

});

module.exports = router;
