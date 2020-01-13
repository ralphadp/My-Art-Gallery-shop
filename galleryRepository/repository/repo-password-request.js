var sqlConn = require('../database/db');

class PasswordRequest {

    constructor() {
    }
    
    /**
     * Save the user request Code
     * @param {*} username 
     * @param {*} requestCode 
     */
    save(username, requestCode) {
        let data = {
            username: username, 
            request_code: requestCode
        };

        let sql = 'INSERT INTO changepassword SET ?';

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

    /**
     * Get the username from changepassword if it si active
     * @param {*} requestCode 
     */
    isActive(requestCode) {

        let sql = 'SELECT users.username, CONCAT_WS(" ", users.first_name, users.last_name) AS complete_name FROM changepassword LEFT JOIN users ON users.username = changepassword.username WHERE request_code = ? AND changepassword.active = 1';

        return new Promise((resolve, reject) => {
            sqlConn.query(sql, requestCode, (err, result) => {
                if (!err) {
                    resolve(JSON.parse(JSON.stringify(result)));
                } else {
                    reject(err);
                }
            });
        });
    }

    /**
     * Set the active flag to 0
     * @param {*} requestCode 
     */
    disableRequest(requestCode) {

        let sql = 'UPDATE changepassword SET active = 0 WHERE request_code = ?';

        return new Promise((resolve, reject) => {
            sqlConn.query(sql, requestCode, (err, result) => {
                if (!err) {
                    resolve(JSON.parse(JSON.stringify(result)));
                } else {
                    reject(err);
                }
            });
        });
    }
}

module.exports = PasswordRequest;