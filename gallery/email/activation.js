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
const sendSuccessfulActivation = (userInfo) => {
    if (!global.options.EMAIL_BACK) {
        console.log('Send successful User Accout Activation INACTIVE');
        return;
    }

    try {
        var mailOptions = {
            from: process.env.APP_EMAIL,
            to: userInfo.email,
            subject: 'Successfully Activation Account - Gallery Art',
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

/**
 * Send new password request to the user
 * @param {*} codeRequest 
 * @param {*} userInfo 
 */
const sendNewPasswordRequest = (codeRequest, userInfo) => {

    try {

        userInfo.codeRequest = codeRequest;

        var mailOptions = {
            from: process.env.APP_EMAIL,
            to: userInfo.email,
            subject: 'New password request - Gallery Art',
            html: renderTemplate('./email/templates/new-password-request.html', userInfo)
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Success new password request email sent: ' + info.response);
            }
        });
    } catch(error) {
        console.log('sendNewPasswordRequest error: ', error);
    }
}

/**
 * Send email of the successfully change of user password
 * @param {*} userInfo 
 */
const sendSuccessfulPasswordChange = (userInfo) => {
    if (!global.options.EMAIL_BACK) {
        console.log('Send successful change password INACTIVE');
        return;
    }
console.log(userInfo);
    try {
        var mailOptions = {
            from: process.env.APP_EMAIL,
            to: userInfo.email || userInfo.username, //Error: No recipients defined
            subject: 'Successfully Password change - Gallery Art',
            html: renderTemplate('./email/templates/successful-password-change.html', userInfo)
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Success Password Change Email sent: ' + info.response);
            }
        });
    } catch(error) {
        console.log('sendSuccessfulPasswordChange error: ',error);
    }
}

module.exports.sendActivationRequest = sendActivationRequest;
module.exports.sendSuccessfulActivation = sendSuccessfulActivation;
module.exports.sendNewPasswordRequest = sendNewPasswordRequest;
module.exports.sendSuccessfulPasswordChange = sendSuccessfulPasswordChange;