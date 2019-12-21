var sqlConn = require('../database/db');

class Admins {

    constructor() {

    }
    
    getByUsername(username) {
        
        let sql = 'SELECT * FROM admin WHERE username = ?';

        return new Promise((resolve, reject) => {
            sqlConn.query(sql, [username], (err, result) => {
                if (!err) {
                    resolve(JSON.parse(JSON.stringify(result)));
                } else {
                    reject(err);
                }
            });
        });
    }

    getAll() {
        let sql = "SELECT * FROM admin";

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

    save(admin) {
        let data = {
            first_name: admin.firstname,
            last_name: admin.lastname,
            username: admin.username,
            password: admin.password,
            registration_date: admin.registration,
            email: admin.email,
            email2: admin.email2,
            movile: admin.movile,
            movile2: admin.movile2,
            birth: admin.birth,
            country: admin.country,
            city: admin.city,
            postal_code: admin.postalcode,
        };

        let sql = "INSERT INTO admin SET ?";

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

module.exports = Admins;