var express = require('express');
const thumbsPage = require('./helpers/thumbs-info');
var router = express.Router();

/* GET page{index} Page. */
router.get('/:indexPage', function(req, res, next) {
  
  const payload = thumbsPage(req.params.indexPage);

  if (!payload) {
    res.status(404);
    res.render('404');
  }

  res.render('index', payload);
});

module.exports = router;
