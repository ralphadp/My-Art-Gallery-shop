var express = require('express');
var {admins, config} = require('galleryRepository');
var Util = require('../model/util');
var fetch = require('node-fetch');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Admin - Art Gallery' });
});

/* GET documents page. */
router.get('/documents', function(req, res, next) {
    fetch('http://localhost:8888/api/summary/')
    .then(response => response.json())
    .then(body => {
        console.log(body);
        res.render(
            'documents', 
            { 
                title: 'Documents', 
                files: body
            }
        );
    });
});

/* GET profile page. */
router.get('/profile', function(req, res, next) {
  const response = req.cookies.admin_response || null;
  res.clearCookie('admin_response');

  admin = new admins();
  admin.getByUsername(global.currentAdmin).then((result) => {
    let profile = null;

    if (result.length) {
        profile = result[0];
        profile.registration_date = Util.getDateFromDatetime(profile.registration_date);
        profile.birth = Util.getDateFromDatetime(profile.birth);
    }

    res.render(
      'profile', 
      { 
        title: 'Profile User Info', 
        profile: profile,
        result: response
      }
    );
 
  });
});

/* GET messages page. */
router.get('/messages', function(req, res, next) {
  res.render('messages', { title: 'Inbox messages' });
});

/* GET configuration page. */
router.get('/configuration', function(req, res, next) {
  oConfig = new config;
  oConfig.getAll().then((result) => {
    res.render('configuration', { title: 'Configuration', config: result });
  });
  
});

module.exports = router;
