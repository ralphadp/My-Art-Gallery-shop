var fetch = require('node-fetch');

const tokenCheck = function(req, res, next) {

    req.session.userExtId = null;
    const token = req.cookies['access_token'];
    console.log('access_token:', token);

    if (typeof token !== 'undefined') {
         fetch(`http://localhost:3333/api/check/${token}`)
        .then(jwtResponse => jwtResponse.json())
        .then(jwtResponse => {
            console.log('jwt response:', jwtResponse);
            if (jwtResponse.success) {
                req.session.userExtId = jwtResponse.username;
                next();
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