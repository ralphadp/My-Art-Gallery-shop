var fetch = require('node-fetch');
const service = require('./servicesPath');

const tokenCheck = function(req, res, next) {

    req.session.userExtId = null;
    const token = req.cookies['access_token'];
    console.log('access_token:', token);

    if (typeof token !== 'undefined') {
         fetch(`${service.jwtHost}/api/check-auth/${token}`)
        .then(jwtResponse => jwtResponse.json())
        .then(jwtResponse => {
            console.log('jwt response:', jwtResponse);
            if (jwtResponse.success) {
                req.session.userExtId = jwtResponse.data.userId;
                req.session.name = jwtResponse.data.username;
                req.session.email = jwtResponse.data.userEmail;
                req.session.photo = jwtResponse.data.photo;
            }
        }).catch(error => {
            console.log(error);
        }).finally(()=> {
            next();
        });
    } else {
        next();
    }
    
}

module.exports = tokenCheck;