var nodemailer = require('nodemailer');
var renderTemplate = require('./templates/render');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.APP_EMAIL,
        pass: process.env.APP_EMAIL_PASSWORD
    }
});

/**
 * Send an email to request an activation of the new user
 * @param {*} activationCode 
 * @param {*} userInfo 
 */
const sendActivationRequest = (activationCode, userInfo) => {

    try {
        userInfo.activationCode = activationCode;

        var mailOptions = {
            from: process.env.APP_EMAIL,
            to: userInfo.email,
            subject: 'Activation Account - Gallery Art',
            html: renderTemplate('./email/templates/activate.html', userInfo)
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Activation Request Email sent: ' + info.response);
            }
        });
    } catch(error) {
        console.log(error);
    }
}

/**
 * Send email of activation
 * @param {*} userInfo 
 */
const sendSucessfulActivation = (userInfo) => {
    try {
        var mailOptions = {
            from: process.env.APP_EMAIL,
            to: userInfo.email,
            subject: 'Sucessfully Activation Account - Gallery Art',
            html: renderTemplate('./email/templates/sucessful-activation.html', userInfo)
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Success Activation Email sent: ' + info.response);
            }
        });
    } catch(error) {
        console.log(error);
    }
}

module.exports.sendActivationRequest = sendActivationRequest;
module.exports.sendSucessfulActivation = sendSucessfulActivation;