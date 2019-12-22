var sqlConn = require('../database/db');

class Config {

    constructor() {

    }
    
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