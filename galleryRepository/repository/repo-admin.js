var sqlConn = require('../database/db');

class Admins {

    constructor() {

    }

    /**
     * Get a user admin by id 
     * @param {*} id 
     */
    getById(id) {
        
        let sql = 'SELECT * FROM admin WHERE id = ?';

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

    /**
     * Get a admin by username
     * @param {*} username 
     */
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

    /**
     * Get all the users from admin table
     */
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

    /**
     * Store a new admin
     * @param {*} admin 
     */
    save(admin) {
        let data = {
            first_name: admin.first_name,
            last_name: admin.last_name,
            username: admin.username,
            password: admin.password,
            registration_date: admin.registration_date,
            email: admin.email,
            email2: admin.email2,
            movile: admin.movile,
            movile2: admin.movile2,
            birth: admin.birth,
            gender: admin.gender,
            country: admin.country,
            city: admin.city,
            postal_code: admin.postal_code,
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

    /**
     * Update the admin row by id
     * @param {*} admin 
     */
    update(admin) {

        let params = [
            admin.first_name, 
            admin.last_name,
            admin.username,
            admin.password,
            admin.registration_date,
            admin.email,
            admin.email2,
            admin.movile, 
            admin.movile2, 
            admin.birth,
            admin.gender,
            admin.country, 
            admin.city,
            admin.postal_code,
            admin.id
        ]

        let sql = "UPDATE admin SET first_name=?, last_name=?, username=?, password=?, registration_date=?, email=?, email2=?, movile=?, movile2=?, birth=?, gender=?, country=?, city=?, postal_code=? WHERE id = ?";

        return new Promise((resolve, reject) => {
            sqlConn.query(sql, params, (err, result) => {
                if (!err) {
                    resolve(JSON.parse(JSON.stringify(result)));
                } else {
                    reject(err);
                }
            });
        });
    }

    /**
     * Remove an Admin
     * @param {
     * } adminId 
     */
    delete(adminId) {

        let sql = "DELETE FROM admin WHERE id = ?";

        return new Promise((resolve, reject) => {
            sqlConn.query(sql, [adminId], (err, result) => {
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