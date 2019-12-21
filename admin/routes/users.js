var express = require('express');
var users = require('../repository/repo-users');
var admin = require('../repository/repo-admin');
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
  const adm = new admin();
  adm.getAll().then((result) => {
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
