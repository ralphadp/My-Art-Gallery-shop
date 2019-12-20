var express = require('express');
var categories = require('../repository/categories');
var router = express.Router();

/* GET categories listing. */
router.get('/', function(req, res, next) {
  res.render('categories', { title: 'Categories', tableTitle: 'Categories', data: categories });
});

/* GET categories 'add'. */
router.get('/add', function(req, res, next) {
  res.render('categories-form', { title: 'Categories', titleForm: 'New Category'});
});

/* GET categories 'update'. */
router.get('/update', function(req, res, next) {
  const categorySelected = {id:888, path:'my-category', name:'My category'};
  res.render('categories-form', { title: 'Categories', titleForm: 'Categories',  data: categorySelected });
});

/* GET categories 'delete'. */
router.get('/delete', function(req, res, next) {
  const categorySelected = {id:888, path:'my-category', name:'My category'};
  res.render('categories-form', { title: 'Categories', titleForm: 'Categories',  data: categorySelected });
});

module.exports = router;
