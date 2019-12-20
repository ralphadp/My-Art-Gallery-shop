var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Admin - Art Gallery' });
});

/* GET documents page. */
router.get('/documents', function(req, res, next) {
  res.render('documents', { title: 'Documents' });
});

/* GET profile page. */
router.get('/profile', function(req, res, next) {
  res.render('profile', { title: 'Profile User Info' });
});

/* GET messages page. */
router.get('/messages', function(req, res, next) {
  res.render('messages', { title: 'Inbox messages' });
});

/* GET configuration page. */
router.get('/configuration', function(req, res, next) {
  res.render('configuration', { title: 'Configuration' });
});

module.exports = router;
