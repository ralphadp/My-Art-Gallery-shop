var express = require('express');
const {users} = require('galleryRepository');
var router = express.Router();

/* GET login Page. */
router.get('/', function(req, res, next) {

    const response = req.cookies.activation_response || null;
    res.clearCookie('activation_response');

    res.render('login', {title: 'login', response: response});

});

/* POST login process request route. */
router.post('/validation', function(req, res, next) {

    let response = {};

    const user = new users();

    user.verify(req.body.username, req.body.password).then(result => {
        if (result.length) {
            const validUser = result[0];
            if (validUser.active === 1) {

                req.session.name = validUser.first_name + ' ' + validUser.last_name;
                req.session.email = validUser.email;
                req.session.userExtId = validUser.external_id;

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
            console.log(`... App will send id to JWT service if it is ok then will response its token`);
            const jwtToken = 'GlohbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
            const jwtCookie = `access_token=${jwtToken}; Path=/; Max-Age=604800; HttpOnly;`;

            res.header("Set-Cookie", jwtCookie);
        }
        res.send(response);
    });
    
});

module.exports = router;
