var nodemailer = require('nodemailer');
var renderTemplate = require('./templates/render');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'galleryart@gmail.com',
        pass: 'nuggetsession!0'
    }
});

const sendActivationRequest = (activationCode, userInfo) => {

    userInfo.activationCode = activationCode;

    var mailOptions = {
        from: 'galleryart@gmail.com',
        to: userInfo.email,
        subject: 'Activation Account - Gallery Art',
        html: renderTemplate('./email/templates/activate.html', userInfo)
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Activation Reqeust Email sent: ' + info.response);
        }
    });
}

const sendSucessfulActivation = (userInfo) => {

    var mailOptions = {
        from: 'galleryart@gmail.com',
        to: userInfo.email,
        subject: 'Sucessfully Activation Account - Gallery Art',
        html: renderTemplate('./email/templates/sucessful-activation.html', userInfo)
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Sucess Activation Email sent: ' + info.response);
        }
    });
}

module.exports.sendActivationRequest = sendActivationRequest;
module.exports.sendSucessfulActivation = sendSucessfulActivation;