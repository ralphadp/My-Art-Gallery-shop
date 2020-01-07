var express = require('express');
const {users, registration} = require('galleryRepository');
const {TODAY} = require('../helpers/middleware/tasks/util/utilities');
var {sendActivationRequest, sendSucessfulActivation} = require('../email/activation');
var shortid = require('shortid');
var generator = require('generate-serial-number');
var router = express.Router();

/* GET register Page. */
router.get('/', function(req, res, next) {

    res.render('register', {title: 'SignIn'});
    
});

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
            const REGISTRATION_CODE = generator.generate(30);
            register.save(req.body.external_id, REGISTRATION_CODE).then(result => {
                if (result.affectedRows) {
                    sendActivationRequest(REGISTRATION_CODE, req.body);
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

    let response = {};
    const user = new users();

    user.activate(req.params.code).then(result => {
        if (result.affectedRows) {
            user.getByActivationCode(req.params.code).then(result => {
                if (result.length) {
                    sendSucessfulActivation(result[0]);
                    response = {
                        result: true,
                        message: 'Your account has been activated, you can login now. Thank you.'
                    };
                } else {
                    response = {
                        result: false,
                        message: 'There was a error at time to set your user. Please contact our Technical services.'
                    };
                }
            }).catch(error => {
                response = {
                    result: false,
                    message: error
                };
            }).finaly(()=> {
                res.cookie('activation_response' , response, {maxAge: 20000});
                res.redirect('/login');
            }); 
        } else {
            response = {
                result: false,
                message: result.message
            };
            res.cookie('activation_response' , response, {maxAge: 20000});
            res.redirect('/login');
        }
    }).catch(error => {
        response = {
            result: false,
            message: error
        };
        res.cookie('activation_response' , response, {maxAge: 20000});
        res.redirect('/login');
    });

});

module.exports = router;