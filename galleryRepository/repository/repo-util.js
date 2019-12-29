var sqlConn = require('../database/db');

class Util {

    constructor() {

    }
    
    /**
     * Get the value, by the reference key
     * @param {*} key 
     */
    getValue(key) {
        
        let sql = 'SELECT util.value FROM util WHERE util.key = ?';

        return new Promise((resolve, reject) => {
            sqlConn.query(sql, [key], (err, result) => {
                if (!err) {
                    resolve(JSON.parse(JSON.stringify(result)));
                } else {
                    reject(err);
                }
            });
        });
    }

    /**
     * Update an useful value
     * @param {*} key 
     * @param {*} value 
     */
    update(key, value) {

        let sql = "UPDATE util SET util.value = ? WHERE util.key = ?";

        return new Promise((resolve, reject) => {
            sqlConn.query(sql, [value, key], (err, result) => {
                if (!err) {
                    resolve(JSON.parse(JSON.stringify(result)));
                } else {
                    reject(err);
                }
            });
        });
    }

    /**
     * Insert new (key,value)
     * @param {*} key 
     * @param {*} value 
     */
    save(key, value) {
        let data = {
            key: key,
            value: value
        };

        let sql = "INSERT INTO util SET ?";

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

module.exports = Util;