var express = require('express');
const {users, passwordRequest} = require('galleryRepository');
var fetch = require('node-fetch');
var {sendNewPasswordRequest, sendSuccessfulPasswordChange} = require('../email/activation');
const {validate, validateResult} = require('../helpers/validate');
var generator = require('generate-serial-number');
var router = express.Router();

/* GET login Page. */
router.get('/', function(req, res, next) {

    const response = req.cookies.activation_response || null;
    res.clearCookie('activation_response');

    res.render('login', {title: 'login', response: response});

});

/* POST login process request route. */
router.post('/validation', validate('login'), function(req, res, next) {

    let userInfo = {};
    let response = {};

    const errors = validateResult(req);

    if (!errors.isEmpty()) {

        response = {
            result: false,
            message: errors.array().join('\n')
        };
        res.send(response);
        return;
    }

    const user = new users();

    user.verify(req.body.username, req.body.password).then(result => {
        if (result.length) {
            const validUser = result[0];
            if (validUser.active === 1) {

                userInfo.username = validUser.first_name + ' ' + validUser.last_name;
                userInfo.userEmail = validUser.email;
                userInfo.userId = validUser.external_id;
                userInfo.photo = validUser.photo;

                response = {
                    result: true,
                    data: validUser,
                    message: 'Successful Autentication'
                };
            } else {
                response = {
                    result: false,
                    data: validUser,
                    message: 'User not active yet.'
                };
            }
        } else {
            response = {
                result: false,
                data: null,
                message: 'Wrong username or password.'
            };
        }
    }).catch(error => {
        if (typeof error.sqlMessage !== 'undefined') {
            response = {
                result: false,
                data: null,
                message: error.sqlMessage
            };
        } else {
            response = {
                result: false,
                data: null,
                message: error
            };
        }
    }).finally(() => {
        if (response.result) {

            userInfo.hours = '1h';

            fetch(
                'http://localhost:3333/api/generate-by-info/',
                {
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userInfo)
                }
            )
            .then(jwtResponse => jwtResponse.json())
            .then(jwtResponse => {
                if (jwtResponse.success) {
                    const jwtCookie = `access_token=${jwtResponse.token}; Path=/; Max-Age=604800; HttpOnly;`;
                    res.header("Set-Cookie", jwtCookie);
                } 
                console.log('jwt generate response:', jwtResponse.message);
            }).catch(error => {
                console.log(error);
                response = {
                    result: false,
                    data: null,
                    message: 'Could not get authorization from remote server, try later' 
                };
            }).finally(()=> {
                res.send(response);
            });
        } else {
            res.send(response);
        }
    });
    
});

/* POST forgoteen password resend route. */
router.post('/forgoteen', function(req, res, next) {

    let response = {};
    const user = new users();
    const passwordReq = new passwordRequest();

    /* Current users have the email as username*/
    user.getByEmail(req.body.username)
    .then(result => {

        if (result.length) {
            const REQUEST_CODE = generator.generate(40);
            const userInfo = result[0];

            passwordReq.save(userInfo.username, REQUEST_CODE).then(result => {
                if (result.affectedRows) {
                    sendNewPasswordRequest(REQUEST_CODE, userInfo);

                    response = {
                        result: true,
                        message: 'A new password request have sent to you.'
                    };
                } else {
                    response = {
                        result: false,
                        message: 'Cannot send a request now, please try later.'
                    };
                }
            }).catch(error => {
                console.log(error);
                response = {
                    result: false,
                    message: error.sqlMessage || error
                };
            }).finally(() => {
                res.send(response);
            });
        } else {
            let message = `The user [${req.body.username}]  is not registed.`;
            if (!req.body.username.length) {
                message = `The user you provide is empty.`
            }

            response = {
                result: false,
                message: message
            };
            res.send(response);
        }
    })
    .catch(error => {
        console.log(error);
        response = {
            result: false,
            message: error.sqlMessage || error
        };
        res.send(response);
    });

});

/* GET change password route. */
router.get('/change-password/:code', function(req, res, next) {

    //Checking the backwards navigation 
    let response = req.cookies.password_response || null;
    res.clearCookie('password_response');
    if (response) {
        res.render('changePassword', {title: 'Change password', response: response});
        return false;
    }

    //Normal path
    const CODE = req.params.code;
    const passwordReq = new passwordRequest();

    passwordReq.isActive(CODE)
    .then(result => {

        if (result.length) {
            const userInfo = result[0];
            response = {
                result: true,
                username: userInfo.username,
                completeName: userInfo.complete_name,
                code: CODE,
                message: 'Please enter your new password.'
            };
        } else {
            response = {
                result: false,
                message: 'The current link is not longer active.'
            };
        }
    })
    .catch(error => {
        console.log(error);
        response = {
            result: false,
            message: error.sqlMessage || error
        };
    })
    .finally(() => {
        res.render('changePassword', {title: 'Change password', response: response});
    });
});

/* POST enter a new password route. */
router.post('/enter-new-password', function(req, res, next) {

    let response = {};
    const user = new users();
    const passwordReq = new passwordRequest();

    passwordReq.isActive(req.body.code)
    .then(result => {
        if (result.length) {
            user.changePassword(req.body.username, req.body.password)
            .then(result => {
                if (result.affectedRows) {
                    try {
                    sendSuccessfulPasswordChange(req.body);
                    response = {
                        result: true,
                        message: 'Your password have changed.'
                    };
                    } catch(error) {
                        console.log(error);
                    }
                } else {
                    response = {
                        result: false,
                        message: 'Cannot change the password, please try later.'
                    };
                }
            })
            .catch(error => {
                console.log(error);
                response = {
                    result: false,
                    message: error.sqlMessage || error
                };
            })
            .finally(() => {
                res.cookie('password_response', response, {maxAge: 20000});
                res.redirect('/login/password-result/' + req.body.code);
            });
        } else {
            console.log(req.body.code, ' is not longer active');
            res.redirect('/login/change-password/' + req.body.code);
        }
    }).catch(error => {
        console.log(error);
        response = {
            result: false,
            message: error.sqlMessage || error
        };
        res.cookie('password_response', response, {maxAge: 20000});
        res.redirect('/login/change-password/' + req.body.code);
    });
});

/* GET enter a new password route. */
router.get('/password-result/:code', function(req, res, next) {
    const CODE = req.params.code;

    let response1 = req.cookies.password_response || null;
    let response2 = {};
    res.clearCookie('password_response');

    const passwordReq = new passwordRequest();
    passwordReq.disableRequest(CODE)
    .then(result => {

        if (result.affectedRows) {
            response2 = {
                result: true,
                message: 'The request link has expired as well.'
            };
        } else {
            response2 = {
                result: false,
                message: 'Cannot disable password request link'
            };
        }
    })
    .catch(error => {
        console.log(error);
        response2 = {
            result: false,
            message: error.sqlMessage || error
        };
    })
    .finally(() => {
        res.render('changePasswordResult', {title: 'Result', response_password: response1, response_code: response2});
    });
});


module.exports = router;
