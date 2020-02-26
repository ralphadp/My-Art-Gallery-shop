var express = require('express');
var tokenCheck = require('../model/tokenCheck');
var mailer = require('../email/mailer');
var router = express.Router();

/* POST send an email message. */
router.post('/', tokenCheck, function(req, res, next) {

    let response;

    try {
        req.body.description;
        const message = {
            from: req.body.email,
            to: mailer.companyEmail,
            subject: req.body.name, 
            text: req.body.description
        };

        mailer.transport.sendMail(message, function(error, info) {
            if (error) {
                response = {
                    success: false,
                    message: error
                };
            } else {
                response = {
                    success: true,
                    message: info
                };   
            }

            res.send(response);
        });

    } catch(e) {
        response = {
            success: false,
            message: e.message
        };

        res.send(response);    
    }
   
});

module.exports = router;