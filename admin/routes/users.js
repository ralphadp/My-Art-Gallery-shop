var express = require('express');
var {admins, users} = require('galleryRepository');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const user = new users();
  user.getAll().then((result) => {
      res.render(
        'users', 
        { 
          title: 'External Users', 
          tableTitle: 'Users', 
          data: result 
        }
      );
  });
});

/* GET admin listing. */
router.get('/admin', function(req, res, next) {
  const admin = new admins();
  admin.getAll().then((result) => {
    console.log(result);
      res.render(
        'users', 
        { 
          title: 'Internal Users', 
          tableTitle: 'Admins', 
          data: result 
        }
      );
  });
});

/* GET new users form. */
router.get('/new', function(req, res, next) {
    const response = req.cookies.user_response || null;
    res.clearCookie('user_response');

    res.render(
      'users-form', {
        title: 'Users', 
        titleForm: 'New User',
        result: response,
        dataToUpdate: null
      }
    );
});

/* GET new admin form. */
router.get('/admin/new', function(req, res, next) {
  const response = req.cookies.admin_response || null;
  res.clearCookie('admin_response');

  res.render(
    'admins-form', {
      title: 'Admin', 
      titleForm: 'New Admin',
      result: response,
      dataToUpdate: null
    }
  );
});

/* POST users 'save'. */
router.post('/save', function(req, res, next) {

  const user = new users();

  const userParam = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    birth: req.body.birth,
    username: req.body.username,
    password: req.body.password,
    registration_date: req.body.registration_date,
    email: req.body.email,
    gender: req.body.gender,
    movile: req.body.movile,
    country: req.body.country,
    city: req.body.city,
    postal_code: req.body.postal_code
  };

  let response = {};

  user.save(userParam).then(result => {
      response = {
          success: true,
          message: 'The user was added sucessfully.'
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
      res.cookie('user_response' , response, {maxAge: 20000});
      res.redirect( req.header('Referer') || '/');
  });
});

/* POST admins 'save'. */
router.post('/admin/save', function(req, res, next) {

  const admin = new admins();

  const adminParam = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    birth: req.body.birth,
    username: req.body.username,
    password: req.body.password,
    registration_date: req.body.registration_date,
    email: req.body.email,
    email2: req.body.email2,
    gender: req.body.gender,
    movile: req.body.movile,
    movile2: req.body.movile2,
    country: req.body.country,
    city: req.body.city,
    postal_code: req.body.postal_code
  };

  let response = {};

  admin.save(adminParam).then(result => {
      response = {
          success: true,
          message: 'The admin was added sucessfully.'
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
      res.cookie('admin_response' , response, {maxAge: 20000});
      res.redirect( req.header('Referer') || '/');
  });
});

module.exports = router;
