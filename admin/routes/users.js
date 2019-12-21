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

module.exports = router;
