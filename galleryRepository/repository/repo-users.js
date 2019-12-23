var sqlConn = require('../database/db');

class Users {

    constructor() {

    }
    
    getById(id) {
        
        let sql = 'SELECT * FROM users WHERE id = ?';

        return new Promise((resolve, reject) => {
            sqlConn.query(sql, [id], (err, result) => {
                if (!err) {
                    resolve(JSON.parse(JSON.stringify(result)));
                } else {
                    reject(err);
                }
            });
        });
    }

    getAll() {
        let sql = "SELECT * FROM users";

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

    save(user) {
        let data = {
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
            password: user.password,
            registration_date: user.registration_date,
            email: user.email,
            movile: user.movile,
            birth: user.birth,
            gender: user.gender,
            country: user.country,
            city: user.city,
            postal_code: user.postal_code,
        };

        let sql = "INSERT INTO users SET ?";

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

module.exports = Users;