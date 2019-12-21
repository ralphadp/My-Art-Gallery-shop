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
            first_name: user.firstname,
            last_name: user.lastname,
            username: user.username,
            password: user.password,
            registration_date: user.registration,
            email: user.email,
            movile: user.movile,
            birth: user.birth,
            country: user.country,
            city: user.city,
            postal_code: user.postalcode,
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