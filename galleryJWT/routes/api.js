var express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../model/config.js');
var router = express.Router();

/* GET root route api. */
router.get('/', function(req, res, next) {
  res.send('No respose at this point');
});

/* GET validate token route api. */
router.get('/check/:token', function(req, res, next) {
    try {
        const token = req.params.token;

        if (token) {
            jwt.verify (
                token, 
                config.secret, 
                (error, decoded) => {
                    if (error) {
                        res.json({
                            success: false,
                            message: 'Token is not valid'
                        });
                    } else {
                        console.log(decoded);
                        res.json({
                            success: true,
                            username: decoded.username,
                            message: 'Token is valid'
                        });
                    }
                }
            );
        } else { 
            res.json({
                success: false,
                message: 'Auth token is not supplied'
            });
        }
    } catch (error) {
        res.send(500).json({
            success: false,
            message: error
        });
    }
});

/* GET validate token authentication & returning user data, route api. */
router.get('/check-auth/:token', function(req, res, next) {
    try {
        const token = req.params.token;

        if (token) {
            jwt.verify (
                token, 
                config.secret, 
                (error, decoded) => {
                    if (error) {
                        res.json({
                            success: false,
                            message: 'Token is not valid'
                        });
                    } else {
                        console.log(decoded);
                        res.json({
                            success: true,
                            data: {
                                userId: decoded.userId,
                                username: decoded.username,
                                userEmail: decoded.userEmail,
                                photo: decoded.photo
                            },
                            message: 'Token is valid'
                        });
                    }
                }
            );
        } else { 
            res.json({
                success: false,
                message: 'Auth token is not supplied'
            });
        }
    } catch (error) {
        res.send(500).json({
            success: false,
            message: error
        });
    }
});

/* GET generate token route api. */
router.get('/generate/:username/expiration/:hours', function(req, res, next) {
    try {
        const username = req.params.username;
        const hours = req.params.hours;

        if (username) {
            let token = jwt.sign (
                {username: username},  //sample 'susan.32@gmail.com'
                config.secret,
                { expiresIn: hours} //sample '24h'
            );

            res.json({
                success: true,
                message: 'Authentication successful',
                token: token
            });
        } else {
            res.send(400).json({
                success: false,
                message: 'Authentication failed. Please check the request'
            });
        }
    } catch(error) {
        res.send(500).json({
            success: false,
            message: error
        });
    }
});

/* POST generate token route api. */
router.post('/generate-by-info', function(req, res, next) {
    try {

        const userId = req.body.userId;
        const username = req.body.username;
        const userEmail = req.body.userEmail;
        const photo = req.body.photo;
        const hours = req.body.hours;

        if (userId && username) {
            let token = jwt.sign (
                {
                    userId: userId, 
                    username: username, 
                    userEmail: userEmail,
                    photo: photo
                },
                config.secret,
                {expiresIn: hours} //sample '24h'
            );
            console.log('GENERATED: ', token);
            if (token) {
                res.json({
                    success: true,
                    message: 'Authentication successful',
                    token: token
                });
            } else {
                res.send(500).json({
                    success: false,
                    message: 'Signed token is returning null'
                });        
            }

        } else {
            res.send(400).json({
                success: false,
                message: 'Authentication failed. Please check the request'
            });
        }
    } catch(error) {
        console.log(error);
        res.send(500).json({
            success: false,
            message: error
        });
    }
});

module.exports = router;
