var express = require('express');
const {users} = require('galleryRepository');
var fetch = require('node-fetch');
var router = express.Router();

/* GET login Page. */
router.get('/', function(req, res, next) {

    const response = req.cookies.activation_response || null;
    res.clearCookie('activation_response');

    res.render('login', {title: 'login', response: response});

});

/* POST login process request route. */
router.post('/validation', function(req, res, next) {

    let userInfo = {};
    let response = {};

    //TODO: clean username and password

    const user = new users();

    user.verify(req.body.username, req.body.password).then(result => {
        if (result.length) {
            const validUser = result[0];
            if (validUser.active === 1) {

                userInfo.username = validUser.first_name + ' ' + validUser.last_name;
                userInfo.userEmail = validUser.email;
                userInfo.userId = validUser.external_id;

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
                message: 'User not authenticated.'
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

module.exports = router;
