var sqlConn = require('../database/db');

class Registration {

    constructor() {

    }
    
    /**
     * Save an user registration Code
     * @param {*} externalUserId 
     * @param {*} registrationCode 
     */
    save(externalUserId, registrationCode) {
        let data = {
            external_userId: externalUserId, 
            code: registrationCode
        };

        let sql = 'INSERT INTO registration SET ?';

        return new Promise((resolve, reject) => {
            sqlConn.query(sql, data, (err, result) => {
                if (!err) {
                    resolve(JSON.parse(JSON.stringify(result)));
                } else {
                    reject(err);
                }
            });
        });
    }
}

module.exports = Registration;