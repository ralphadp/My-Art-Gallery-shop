var express = require('express');
var {admins, config} = require('galleryRepository');
var Util = require('../model/util');
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
  admin = new admins();
  admin.getByUsername(global.currentAdmin).then((result) => {
    let profile = null;

    if (result.length) {
        profile = result[0];
        profile.registration_date = Util.getDateFromDatetime(profile.registration_date);
        profile.birth = Util.getDateFromDatetime(profile.birth);
    }

    console.log(profile);

    try {
    res.render(
      'profile', 
      { 
        title: 'Profile User Info', 
        profile: profile 
      }
    );
  } catch(error){
    console.log(error);
  }
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
