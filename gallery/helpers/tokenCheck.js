var fetch = require('node-fetch');

const tokenCheck = function(req, res, next) {

    req.session.userExtId = null;
    const token = req.cookies['access_token'];
    console.log('access_token:', token);

    if (typeof token !== 'undefined') {
         fetch(`http://localhost:3333/api/check-auth/${token}`)
        .then(jwtResponse => jwtResponse.json())
        .then(jwtResponse => {
            console.log('jwt response:', jwtResponse);
            if (jwtResponse.success) {
                req.session.userExtId = jwtResponse.data.userId;
                req.session.name = jwtResponse.data.username;
                req.session.email = jwtResponse.data.userEmail;
            }
        }).catch(error => {
            console.log(error);
        }).finally(()=> {
            next();
        });
    } else {
        res.redirect('/login');
    }
    
}

module.exports = tokenCheck;