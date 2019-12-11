const nodemailer = require('nodemailer');

const companyEmail = 'ralphadp@gmail.com';

let transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
       user: 'd5f012266dac6a',
       pass: '8bb5cd4b841330'
    }
});

module.exports = {
    transport,
    companyEmail
};