var express = require('express');
const {users, registration} = require('galleryRepository');
const {TODAY} = require('../helpers/middleware/tasks/util/utilities');
var shortid = require('shortid');
var router = express.Router();

/* GET register Page. */
router.get('/', function(req, res, next) {

    res.render('register', {title: 'SignIn'});
    
});

/*const upload = multer();
app.post('/send', upload.none(), (req, res) => {
    const formData = req.body;*/

/* POST register new user, request route. */
router.post('/new', function(req, res, next) {

    let response = {};
    req.body.username = req.body.email;
    req.body.registration_date = TODAY();
    req.body.external_id = shortid.generate();

    const user = new users();
    const register = new registration();

    user.save(req.body).then(result => {
        if (result.affectedRows) {
            //generate CODE
            const REGISTRATION_CODE = 'df35t3g64jh3hwr4hbrevdfwse';
            register.save(req.body.external_id, REGISTRATION_CODE).then(result => {
                if (result.affectedRows) {
                    ///SEND an email to the user using the 'email' column
                    response = {
                        result: true,
                        message: 'An email was sent to you. Please click on the activation link'
                    };
                } else {
                    response = {
                        result: false,
                        message: result.message
                    };
                }
            }).catch(error => {
                console.log(error);
                response = {
                    result: false,
                    message: error
                };
            }).finally(() => {
                res.send(response);
            });
        } else {
            response = {
                result: false,
                message: result.message
            };
            res.send(response);
        }

    }).catch(error => {
        console.log(error);
        response = {
            result: false,
            message: error
        };
        res.send(response);
    });

});

/* GET Activate the new user, request route. */
router.get('/activation/:code', function(req, res, next) {
    console.log('body: ', req.body);

    const user = new users();
    user.activate(req.params.code).then(result => {
        if (result.affectedRows) {
            response = {
                result: true,
                message: 'Your account has been activated. Thank you'
            };
        } else {
            response = {
                result: false,
                message: result.message
            };
        }

    }).catch(error => {
        console.log(error);
        response = {
            result: false,
            message: error
        };

    }).finally(() => {
        ///SEND an email or Start a page in the browser
        res.send(response);
    });

});


module.exports = router;
