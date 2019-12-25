var sqlConn = require('../database/db');

class Config {

    constructor() {

    }
    
    /**
     * Get the option by kEY-name
     * @param {*} name 
     */
    getById(name) {
        
        let sql = 'SELECT * FROM config WHERE name = ?';

        return new Promise((resolve, reject) => {
            sqlConn.query(sql, [name], (err, result) => {
                if (!err) {
                    resolve(JSON.parse(JSON.stringify(result)));
                } else {
                    reject(err);
                }
            });
        });
    }

    /**
     * Get all the options columns
     */
    getAll() {
        let sql = "SELECT * FROM config";

        return new Promise((resolve, reject) => {
            sqlConn.query(sql, (err, result) => {
                if (!err) {
                    resolve(JSON.parse(JSON.stringify(result)));
                } else {
                    reject(err);
                }
            });
        });
    }

    /**
     * update a batch of options
     * @param {*} batch 
     */
    batchUpdate(batch) {

        const queryUpdate = [];

        for (let keyOptionName in batch) {

            const sql = `UPDATE config SET value = '${batch[keyOptionName]}' WHERE name = '${keyOptionName}'`;

            const sqlPromise = new Promise((resolve, reject) => {
                sqlConn.query(sql, (err, result) => {
                    if (!err) {
                        resolve(JSON.parse(JSON.stringify(result)));
                    } else {
                        reject(err);
                    }
                });
            });

            queryUpdate.push(sqlPromise);
        }

        return Promise.all(queryUpdate);
    }

    /**
     * Save a new option
     * @param {*} config 
     */
    save(config) {
        let data = {
            name: config.name, 
            description: config.description,
            value: config.value
        };

        let sql = "INSERT INTO config SET ?";

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

module.exports = Config;