var express = require('express');
var {users, admins} = require('../repository/users');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users', { title: 'External Users', tableTitle: 'Users', data: users });
});

/* GET admin listing. */
router.get('/admin', function(req, res, next) {
  res.render('users', { title: 'Internal Users', tableTitle: 'Admin', data: admins });
});

module.exports = router;
