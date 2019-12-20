var express = require('express');
var pieces = require('../repository/pieces');
var router = express.Router();

/* GET pieces listing. */
router.get('/', function(req, res, next) {
  res.render('pieces', { title: 'Pieces', tableTitle: 'Pieces', data: pieces });
});

/* GET pieces 'add'. */
router.get('/add', function(req, res, next) {
  res.render('pieces-form', { title: 'Pieces', titleForm: 'New Piece'});
});

/* GET pieces 'update'. */
router.get('/update', function(req, res, next) {
  const pieceSelected = {"id":10, "itemId":"f20fdb18-b56f-4888-8e80-1087329d8c6f", "thumb":"http://picsum.photos/400/200?random=9", "name":"Xerophyllum Michx.", "artist":"Larry Hacquard", "type":"HYPERREALISM", "release_date":"2019-03-24", "size":"2XL", "price":315.0, "currency":"CNY"};
  res.render('pieces-form', { title: 'Pieces', titleForm: 'Pieces',  data: pieceSelected });
});

/* GET pieces 'delete'. */
router.get('/delete', function(req, res, next) {
  const pieceSelected = {"id":10, "itemId":"f20fdb18-b56f-4888-8e80-1087329d8c6f", "thumb":"http://picsum.photos/400/200?random=9", "name":"Xerophyllum Michx.", "artist":"Larry Hacquard", "type":"HYPERREALISM", "release_date":"2019-03-24", "size":"2XL", "price":315.0, "currency":"CNY"};
  res.render('pieces-form', { title: 'Pieces', titleForm: 'Pieces',  data: pieceSelected });
});

module.exports = router;
