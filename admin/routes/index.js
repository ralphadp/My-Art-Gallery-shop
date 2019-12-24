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

  /*TODO: need to hide the mailtrap.io token and set it from configuration*/
  let headers = {
    "Api-Token": "c91bb9378f5f7860b45ae4a1f0b29fab",
    "Accept": "application/json",
    "Content-Type": "application/json"
  };

  let txtHeaders = {
    "Api-Token": "c91bb9378f5f7860b45ae4a1f0b29fab",
    "Accept": "text/plain",
  };

  fetch(
    'https://mailtrap.io/api/v1/inboxes',
    {
      method: 'GET', 
      headers: headers
    }
  ).then(response => response.json())
   .then(content => {

        if (typeof content.error !== 'undefined') {

            res.render('messages', { title: 'Inbox messages', error: content.error });

            return;
        }

        /* Taking the first inbox only, no several vendors */
        const inboxData = {
          id: content[0].id,
          name: content[0].name,
          count: content[0].emails_count
        }

        /*Get all the messages from the inbox */
        fetch(
          `https://mailtrap.io/api/v1/inboxes/${inboxData.id}/messages`,
          {
            method: 'GET', 
            headers: headers
          }
        ).then(response => response.json())
         .then(content => {
           
            let emailContents = [];
            let textRequests = [];

            content.forEach(element => {

                let item = {
                    id : element.id,
                    subject: element.subject,
                    from: element.from_email,
                    sentAt: element.sent_at,
                    urlTextComment: 'https://mailtrap.io' + element.txt_path
                };

                textRequests.push(
                    fetch(item.urlTextComment, {method: 'GET', headers: txtHeaders}).then(response => response.text())
                );

                emailContents.push(item);
            });

            /**Get all the messages bodys */
             Promise.all(textRequests)
            .then(texts => {

              texts.forEach((text, index) => {
                    emailContents[index].text = text;
                });
            })
            .catch (error => console.log(error))
            .finally(() => {
 
                res.render('messages', { title: 'Inbox messages', box: inboxData, messages: emailContents, error: null });
            });

         })
         .catch (error => console.log(error));
    })
    .catch (error => {
      console.log(error);

      res.render('messages', { title: 'Inbox messages', error: error });
    });
});

/* GET configuration page. */
router.get('/configuration', function(req, res, next) {
  oConfig = new config;
  oConfig.getAll().then((result) => {
    res.render('configuration', { title: 'Configuration', config: result });
  });
  
});

module.exports = router;
