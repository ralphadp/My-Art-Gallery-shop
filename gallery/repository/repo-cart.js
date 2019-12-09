var sqlConn = require('../database/db');

class Cart {

    constructor() {

    }
    
    getById(userId) {
        let result = {};
        let sql = `SELECT * FROM cart WHERE userId = '${userId}'`;
        let query = sqlConn.query(sql, (error, results) => {
            if (error) {
                throw error;
            }
            result = JSON.parse(JSON.stringify(results));
        });

        return result;
    }

    getAll() {
        let sql = "SELECT cart.id, cart.userId, pieces.id as pieceId, pieces.name FROM cart INNER JOIN pieces ON cart.pieceId = pieces.id";
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

    delete(id) {
        let result = {};
        let sql = `DELETE FROM cart WHERE id='${id}'`;
        let query = sqlConn.query(sql, (error, results) => {
            if (error) {
                throw error;
            }
            result = JSON.parse(JSON.stringify(results));
        });

        return result;
    }

    save(picked) {
        let result = {};
        let data = {userid: picked.userid, picked: picked.id, name: picked.name, artist: picked.price};
        let sql = "INSERT INTO cart SET ?";
        let query = sqlConn.query(sql, data,(error, results) => {
            if (error) {
                throw error;
            }
            result = JSON.parse(JSON.stringify(results));
        });

        return result;
    }
}

module.exports = Cart;