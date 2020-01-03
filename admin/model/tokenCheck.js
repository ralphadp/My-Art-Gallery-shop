var fetch = require('node-fetch');

const tokenCheck = function(req, res, next) {

    req.session.adminUsername = null;
    const token = req.cookies.auth_token;
    console.log('auth_token:', token);

    if (typeof token !== 'undefined') {
         fetch(`http://localhost:3333/api/check/${token}`)
        .then(jwtResponse => jwtResponse.json())
        .then(jwtResponse => {
            console.log('jwt response:', jwtResponse);
            if (jwtResponse.success) {
                req.session.adminUsername = jwtResponse.username;
                next();
            } else {
                res.redirect('/login');
            }
        }).catch(error => {
            console.log(error);
            res.redirect('/login');
        });
    } else {
        res.redirect('/login');
    }
}

module.exports = tokenCheck;