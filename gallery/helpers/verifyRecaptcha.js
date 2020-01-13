const fetch = require('node-fetch');

/**
 * Veryfy the client captcha
 * @param {*} req 
 */
const verifyRecaptcha = async (captcha) => {

    const verifyGoogleUrl = 
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}&remoteip=${process.env.APP_IP}`;

    let response = await fetch(verifyGoogleUrl);
    let json = await response.json();

    console.log('Google recaptcha response:', json);

    return json.success;
    
}

module.exports = verifyRecaptcha;