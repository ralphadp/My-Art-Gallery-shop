const nodemailer = require('nodemailer');

const companyEmail = process.env.APP_EMAIL;

let transport = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: 2525,
    auth: {
       user: process.env.MAILTRAP_USER,
       pass: process.env.MAILTRAP_PASSWORD
    }
});

module.exports = {
    transport,
    companyEmail
};