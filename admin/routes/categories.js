var express = require('express');
var tokenCheck = require('../model/tokenCheck');
var {categories} = require('galleryRepository');
var ConfigHandler = require('../model/configHandler');
var router = express.Router();

/* GET categories listing. */
router.get('/', tokenCheck, function(req, res, next) {

  const response = req.cookies.category_response || null;
  res.clearCookie('category_response');

  const category = new categories();
  category.getAll().then((result) => {
      res.render(
        'categories', 
        { 
          title: 'Categories List', 
          tableTitle: 'Categories', 
          data: result, 
          response: response
        }
      );
  });
});

/* GET categories 'add'. */
router.get('/add', tokenCheck, function(req, res, next) {
  const response = req.cookies.category_response || null;
  res.clearCookie('category_response');
  res.render(
    'categories-form', 
    { 
      title: 'Categories', 
      titleForm: 'Add new Category', 
      result: response,
      dataToUpdate: null 
    }
  );
});

/* POST categories 'save'. */
router.post('/save', tokenCheck, function(req, res, next) {

  const category = new categories();

  const categoryParam = {
    path: req.body.category_path,
    name: req.body.category_name
  };

  let response = {};

  category.save(categoryParam).then(result => {
      response = {
          success: true,
          message: 'The category was added sucessfully.'
      };
      console.log(result);
  })
  .catch(error => {
      console.log(error);
      response = {
          success: false,
          message: error.sqlMessage
      };
  })
  .finally(() => {
      res.cookie('category_response' , response, {maxAge: 20000});
      res.redirect( req.header('Referer') || '/');
  });
});

/* POST categories 'save'. */
router.post('/update', tokenCheck, function(req, res, next) {

  const category = new categories();

  const categoryParam = {
    id: req.body.category_id,
    path: req.body.category_path,
    name: req.body.category_name
  };

  let response = {};

  category.update(categoryParam).then(result => {
      response = {
          data: categoryParam,
          success: true,
          message: 'The category was updated sucessfully.'
      };
      console.log(result);
  })
  .catch(error => {
      console.log(error);
      response = {
          data: categoryParam,
          success: false,
          message: error.sqlMessage
      };
  })
  .finally(() => {
      res.cookie('category_response' , response, {maxAge: 20000});
      if (ConfigHandler.fetchValue('REDIRECT_UPDATE')) {
          res.redirect('/categories/');
      } else {
          res.redirect( req.header('Referer') || '/');
      }
  });
});

/* GET categories 'update'. */
router.get('/edit/:id/:path/:name', tokenCheck, function(req, res, next) {

  const response = req.cookies.category_response || null;
  res.clearCookie('category_response');

  let dataToUpdate = !response ? (req.params || null) : response.data;

  res.render(
    'categories-form', 
    { 
      title: 'Categories', 
      titleForm: 'Update Category', 
      result: response,
      dataToUpdate: dataToUpdate 
    }
  );
});

/* POST categories 'delete'. */
router.post('/delete', tokenCheck, function(req, res, next) {

  const category = new categories();

  category.delete(req.body.id).then(result => {
      response = {
          success: true,
          message: 'The category was removed sucessfully.'
      };
      console.log(result);
  })
  .catch(error => {
    console.log(error);
      response = {
          success: false,
          message: error.sqlMessage
      };
  })
  .finally(() => {
    res.cookie('category_response' , response, {maxAge: 20000});
    res.redirect('/categories/');
  });

});

/* GET categories 'search'. */
router.get('/search/:textPattern', tokenCheck, function(req, res, next) {

  const response = req.cookies.category_response || null;
  res.clearCookie('category_response');

  const words = req.params.textPattern.split('+');
  const pattern = words.join('|');
  const phrase = words.join(' ');

  const category = new categories();

  category.getAllSearching(pattern).then((result) => {
      res.render(
        'categories', 
        { 
          title: `Categories search by: "${phrase}" `, 
          tableTitle: 'Categories', 
          data: result, 
          response: response,
          searchText: phrase
        }
      );
  });
});

module.exports = router;
