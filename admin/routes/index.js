var express = require('express');
var {admins, config} = require('galleryRepository');
var Util = require('../model/util');
var fetch = require('node-fetch');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Admin - Art Gallery' });
});

router.get('/sms-test', function(req, res, next) {
  const accountSid = 'ACe26cde0d05a99da7b947f5b66e63e490';
  const authToken = '66b2bac3daf56a062abf154f100142d4';
  const client = require('twilio')(accountSid, authToken);
console.log('sending sms');
  client.messages
      .create({body: 'Hi there!', from: '+59177989726', to: '+59177989726'})
      .then(message => console.log(message.sid));

  /*client.messages
      .create({
         body: 'Phantom Menace was clearly the best of the prequel trilogy.',
         messagingServiceSid: 'MG9752274e9e519418a7406176694466fa',
         to: '+59177989726'
       })
      .then(message => console.log(message.sid));*/
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

  const response = req.cookies.option_response || null;
  res.clearCookie('option_response');

  const oConfig = new config;
  oConfig.getAll().then((result) => {
      res.render(
        'configuration', 
        { 
          title: 'Configuration', 
          config: result,
          response: response
        }
      );
  });
  
});

router.post('/configuration/update', function(req, res, next) {
  const oConfig = new config;

  let response = {};

  let options = JSON.parse(JSON.stringify(req.body));

  console.log(options);

  oConfig.batchUpdate(options).then(results => {
      response = {
          data: options,
          success: true,
          message: 'The options were was updated sucessfully.'
      };
      console.log(results);
  })
  .catch(error => {
      console.log(error);
      response = {
          data: options,
          success: false,
          message: error.sqlMessage
      };
  })
  .finally(() => {
      res.cookie('option_response' , response, {maxAge: 20000});
      res.redirect( req.header('Referer') || '/');
  });
 
});

module.exports = router;
