const jwt = require('jsonwebtoken');
const config = require('../model/config.js');

/**
 * Verify the JWT Token health, returning user data
 * @param {*} req 
 * @param {*} res 
 * @param {*} validResponse 
 */
function fetchVerifyResponse(req, res, validResponse) {
    try {
        const token = req.params.token;

        if (token) {
            jwt.verify (
                token, 
                config.secret, 
                (error, decoded) => {
                    console.log('decoded: ', decoded);
                    const result = error 
                    ? {
                        success: false,
                        message: 'Token is not valid'
                    }
                    : {
                        success: true,
                        message: 'Token is valid',
                        ...validResponse(decoded)
                    }
                    res.json(result);
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
            message: error.message
        });
    }
}

/**
 * Closure to handle current user data
 * @param {*} params 
 * @param {*} attributesToVerify 
 */
function userHandler(params, attributesToVerify) {
    return {
        get: () => {
            return JSON.parse(
                JSON.stringify(
                    params
                )
            );
        },
        isValid: () => {
            //verify the existence of the attributes set in 'attributes' array
            attributesToVerify.forEach(attribute => {
                if (!params[attribute]) {
                    return false;
                }
            });

            return true;
        },
        getTimeValidation: () => {
            //check the existence of hours
            if (!params.hours) {
                console.log('No [hours] attribute, set default 1h value.');
                return '1h';
            }

            return params.hours;
        }
    }
}

/**
 * Generate token based in user data
 * @param {*} req 
 * @param {*} res 
 * @param {*} userData 
 */
function generateToken(req, res, userData) {
    try {

        if (userData.isValid()) {
            let token = jwt.sign (
                userData.get(),  //sample 'susan.32@gmail.com'
                config.secret,
                {expiresIn: userData.getTimeValidation()} //sample '24h'
            );

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
        res.send(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    rootResponser: (req, res, next) => {
        res.send('No respose at this point');
    },
    verifyTokenHealth: (req, res, next) => {

        fetchVerifyResponse(req, res, (decoded) => {
            return {
                username: decoded.username,
            };
        });
    },
    verifyTokenHealthObject: (req, res, next) => {

        fetchVerifyResponse(req, res, (decoded) => {
            return {
                data: {
                    userId: decoded.userId,
                    username: decoded.username,
                    userEmail: decoded.userEmail,
                    photo: decoded.photo
                }
            };
        });
    },
    generateTokenByUser: function(req, res, next) {

        generateToken(req, res, userHandler(req.params, ['username']));
    },
    generateTokenByUserInfo: function(req, res, next) {

        generateToken(req, res, userHandler(req.body, ['userId', 'username']));
    }
};