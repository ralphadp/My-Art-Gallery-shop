var sqlConn = require('../database/db');

class Users {

    constructor() {

    }

    fetchSearchQuery(pattern) {
        let wherePattern = '';

        if (pattern) {
            wherePattern = ` WHERE (first_name REGEXP "${pattern}") ` +
            `or (last_name REGEXP "${pattern}") ` +
            `or (username REGEXP "${pattern}")` +
            `or (email REGEXP "${pattern}")` +
            `or (movile REGEXP "${pattern}")` +
            `or (country REGEXP "${pattern}")` +
            `or (city REGEXP "${pattern}")`;
        }

        return wherePattern;
    }
    
    /**
     * Pick a user by id 
     * @param {*} id 
     */
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

    /**
     * Pick a user by email
     * @param {*} email
     */
    getByEmail(email) {

        let sql = 'SELECT * FROM users WHERE email = ?';

        return new Promise((resolve, reject) => {
            sqlConn.query(sql, [email], (err, result) => {
                if (!err) {
                    resolve(JSON.parse(JSON.stringify(result)));
                } else {
                    reject(err);
                }
            });
        });
    }

    /**
     * Return all the users
     */
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

    /**
     * Get all the users according the pattern searching text 
     * @param {*} pattern 
     */
    getAllSearching(pattern) {
 
        let sql = `SELECT * FROM users ${this.fetchSearchQuery(pattern)}`;

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
     * Get Users by mouth and year
     * @param {*} mouth 
     * @param {*} year 
     */
    getMouthYearSignin(mouth, year) {

        const WHERE = [
            mouth ? `MONTH(registration_date) = "${mouth}"` : null,
            year ? `YEAR(registration_date) = "${year}"` : null
        ].filter(Boolean).join(" AND ");

        let sql = `SELECT first_name, last_name, YEAR(CURDATE()) - YEAR(birth) AS age, email, movile, country FROM users WHERE ${WHERE}`;

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
     * Get count of users by country
     */
    getGroupByCountry() {

        let sql = `SELECT country, count(*) as number FROM users group by country`;

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
     * Store a new user
     * @param {*} user 
     */
    save(user) {
        let data = {
            external_id: user.external_id,
            photo: user.photo,
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
            accept_legal: user.accept_legal
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

    /**
     * Update the user by id
     * @param {*} user 
     */
    update(user) {

        let params = [
            user.photo,
            user.first_name, 
            user.last_name,
            user.username,
            user.password,
            user.registration_date,
            user.email,
            user.movile, 
            user.birth,
            user.gender,
            user.country, 
            user.city,
            user.postal_code,
            user.id
        ]

        let sql = "UPDATE users SET photo=?, first_name=?, last_name=?, username=?, password=?, registration_date=?, email=?, movile=?, birth=?, gender=?, country=?, city=?, postal_code=? WHERE id = ?";

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
     * REmove an user by id
     * @param {*} userId 
     */
    delete(userId) {

        let sql = "DELETE FROM users WHERE id = ?";

        return new Promise((resolve, reject) => {
            sqlConn.query(sql, [userId], (err, result) => {
                if (!err) {
                    resolve(JSON.parse(JSON.stringify(result)));
                } else {
                    reject(err);
                }
            });
        });
    }

    /**
     * Verify user
     * @param {*} user 
     * @param {*} pass 
     */
    verify(user, pass) {

        let sql = "SELECT id, external_id, first_name, last_name, email, username, photo, active FROM users WHERE username = ? AND password = ?";

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

    /**
     * Activate user
     * @param {*} code
     */
    activate(code) {

        let sql = "UPDATE users SET active=1 WHERE external_id = (SELECT external_userId FROM registration WHERE code = ?)";

        return new Promise((resolve, reject) => {
            sqlConn.query(sql, [code], (err, result) => {
                if (!err) {
                    resolve(JSON.parse(JSON.stringify(result)));
                } else {
                    reject(err);
                }
            });
        });
    }

    /**
     * Get user by activation code
     * @param {*} code 
     */
    getByActivationCode(code) {

        let sql = "SELECT * FROM users LEFT JOIN registration ON users.external_id = registration.external_userId WHERE registration.code = ?";

        return new Promise((resolve, reject) => {
            sqlConn.query(sql, [code], (err, result) => {
                if (!err) {
                    resolve(JSON.parse(JSON.stringify(result)));
                } else {
                    reject(err);
                }
            });
        });
    }

    /**
     * Change the password of certain user
     * @param {*} user 
     * @param {*} pass 
     */
    changePassword(user, pass) {

        let sql = "UPDATE users SET password = ? WHERE username = ?";

        return new Promise((resolve, reject) => {
            sqlConn.query(sql, [pass, user], (err, result) => {
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