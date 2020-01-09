var express = require('express');
var {admins, users, pieces, config} = require('galleryRepository');
var Util = require('../model/util');
var tokenCheck = require('../model/tokenCheck');
var fetch = require('node-fetch');
var router = express.Router();

/* GET login page. */
router.get('/login', function(req, res, next) {
  
  const response = req.cookies.authorization_response || null;
  res.clearCookie('authorization_response');

  res.render('login', {
      title: 'Login - Admin', 
      titleForm: 'Login',
      response: response
  });

});

/* POST verification route. */
router.post('/login/verification', function(req, res, next) {

    /*TODO: Clean username and password */
    const user = req.body.user.trim();
    const pass = req.body.pass.trim();
    const admin = new admins();

    admin.verify(user, pass).then(result => {
        console.log(result);
        if (result.length) {
            fetch(`http://localhost:3333/api/generate/${result[0].username}/expiration/1h`)
            .then(jwtResponse => jwtResponse.json())
            .then(jwtResponse => {
                if (jwtResponse.success) {
                    const jwtCookie = `auth_token=${jwtResponse.token}; Path=/; Max-Age=604800; HttpOnly;`;
                    res.header("Set-Cookie", jwtCookie);
                } 
                console.log('jwt generate response:', jwtResponse.message);
                res.redirect('/');
            }).catch(error => {
                console.log(error);
                const response = 'Could not get authorization from jwt remote server, try later';
                res.header("Set-Cookie", `authorization_response=${response}; Path=/; Max-Age=5000; HttpOnly;`);
                res.redirect('/login');
            })
        } else {
            const response = 'The username or password is incorrect';
            res.header("Set-Cookie", `authorization_response=${response}; Path=/; Max-Age=5000; HttpOnly;`);
            res.redirect('/login');
        }
    }).catch(error => console.log(error));

});

/* GET login page. */
router.get('/logout', tokenCheck, function(req, res, next) {
  
  res.clearCookie('auth_token');
  req.session.destroy();
  res.redirect('/login');

});

/* GET home page. */
router.get('/', tokenCheck, function(req, res, next) {

  console.log('token:', req.cookies.access_token);

  const user = new users();
  const piece = new pieces();

  user.getGroupByCountry().then((result) => {
      /* Convert a array of object to array of arrays */
      let others = ['Others', 0];
      let userByCountry = result.map((object) => {
        let item = [];

        if (Number(object.number) <= 1) {
            others[1]++;
            return;
        }
        item.push(object.country ? object.country : 'Unknown');
        item.push(object.number);
        return item;
      }).filter(item => item !== undefined);
      userByCountry.push(others);

      user.getMouthYearSignin(12, 2019).then((result) => {
          const userTable = result;

          piece.getGroupByType().then((result) => {

              let piecesByType = result.map((object) => {
                let item = [];
                item.push(object.type);
                item.push(object.number);
                return item;
              });

              piece.getGroupByYear().then((result) => {

                  let piecesReleasedYear = result.map((object) => {
                    let item = [];
                    item.push(object.year);
                    item.push(object.number);
                    return item;
                  });

                  res.render('index', { 
                      title: 'Admin - Art Gallery', 
                      userByCountry: JSON.stringify(userByCountry),
                      data: userTable,
                      piecesByType: JSON.stringify(piecesByType),
                      piecesReleasedYear: JSON.stringify(piecesReleasedYear)
                  });
              });
          });
      });
  });

});

/* GET documents page. */
router.get('/documents', tokenCheck, function(req, res, next) {
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
router.get('/profile', tokenCheck, function(req, res, next) {
  const response = req.cookies.admin_response || null;
  res.clearCookie('admin_response');

  admin = new admins();
  admin.getByUsername(req.session.adminUsername).then((result) => {
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
router.get('/messages', tokenCheck, function(req, res, next) {

  /*TODO: need to hide the mailtrap.io token and set it from configuration*/
  let headers = {
    "Api-Token": process.env.MAILTRAP_API_TOKEN,
    "Accept": "application/json",
    "Content-Type": "application/json"
  };

  let txtHeaders = {
    "Api-Token": process.env.MAILTRAP_API_TOKEN,
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

        if (!content.length) {
            res.render('messages', { title: 'Inbox messages', error: 'Content is empty'});
            return;
        }

        /*Saving the counter of messages */
        Util.getValueOfStorage(
            'READED_MESSAGES_COUNTER', 
            (messagesCount) => {
                if (isNaN(messagesCount)) {
                    console.log('Could not found the COUNTER');
                     /*TODO: need the emiter */
                    global.currentEmailCounter = Number(content[0].emails_count);
                } else {
                    /*TODO: need the emiter */
                    global.currentEmailCounter = Number(content[0].emails_count) - Number(messagesCount);
                }
            },
            (error) => {
                console.log(error);
            }
        );

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

                /*Saving messages in util table*/
                Util.getValueOfStorage(element.id, (value) => {
                    if (value === 'empty') {
                        Util.setKeyValueInStorage(element.id, 0, 
                          (result) => {
                            console.log(result);
                            console.log(`Message id: ${element.id} saved`);
                          },
                          (error) => {
                            console.log('Couln\'t save message id ' + error);
                          });
                    }
                  }, 
                  (error) => console.log(error)
                );

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
router.get('/configuration', tokenCheck, function(req, res, next) {

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

router.post('/configuration/update', tokenCheck, function(req, res, next) {
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
      fetch('http://localhost:3000/remote//update-config/')
      .then(response => response.json())
      .then(body => {
         console.log('response from app', body);
      });
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
