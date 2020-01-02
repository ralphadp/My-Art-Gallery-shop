var sqlConn = require('../database/db');

class Admins {

    constructor() {

    }

    fetchSearchQuery(pattern) {
        let wherePattern = '';

        if (pattern) {
            wherePattern = ` WHERE (first_name REGEXP "${pattern}") ` +
            `or (last_name REGEXP "${pattern}") ` +
            `or (username REGEXP "${pattern}")` +
            `or (email REGEXP "${pattern}")` +
            `or (email2 REGEXP "${pattern}")` +
            `or (movile REGEXP "${pattern}")` +
            `or (movile2 REGEXP "${pattern}")` +
            `or (country REGEXP "${pattern}")` +
            `or (city REGEXP "${pattern}")`;
        }

        return wherePattern;
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
     * Search in admin data, by pattern phrase
     * @param {*} pattern 
     */
    getAllSearching(pattern) {
 
        let sql = `SELECT * FROM admin ${this.fetchSearchQuery(pattern)}`;

        return new Promise((resolve, reject) => {
            sqlConn.query(sql, (error, result) => {
                if (!error) {
                    const cleanJson = JSON.parse(JSON.stringify(result));
                    resolve(cleanJson);
                } else {
                    reject(error);
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
            photo: admin.photo,
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
            admin.photo,
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

        let sql = "UPDATE admin SET photo=?, first_name=?, last_name=?, username=?, password=?, registration_date=?, email=?, email2=?, movile=?, movile2=?, birth=?, gender=?, country=?, city=?, postal_code=? WHERE id = ?";

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

    /**
     * Verify administrator
     * @param {*} user 
     * @param {*} pass 
     */
    verify(user, pass) {
        let sql = "SELECT id, username FROM admin WHERE username = ? AND password = ?";

        return new Promise((resolve, reject) => {
            sqlConn.query(sql, [user, pass], (err, result) => {
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