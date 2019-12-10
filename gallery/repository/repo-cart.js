var sqlConn = require('../database/db');

class Cart {

    constructor() {

    }
    
    /**
     * Get all the possible trades from the current user set in the parameter userId
     * 
     * @param {*} userId 
     */
    getById(userId) {
        let sql = 'SELECT cart.id, cart.userId, pieces.id as pieceId, pieces.name FROM cart INNER JOIN pieces ON cart.pieceId = pieces.id WHERE userId = ?';

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
     * Get all the possible trades from all the users 
     */
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

    /**
     * Remove a piece of the cart
     * 
     * @param {*} pickedPieceId 
     */
    delete(pickedPieceId) {
        let sql = 'DELETE FROM cart WHERE pieceId = ?';

        return new Promise((resolve, reject) => {
            sqlConn.query(sql, [pickedPieceId], (err, result) => {
                if (!err) {
                    resolve(JSON.parse(JSON.stringify(result)));
                } else {
                    reject(err);
                }
            });
        });
    }

    /**
     * Save a picked piece for an user
     * 
     * @param {*} userId 
     * @param {*} pickedPieceId 
     */
    save(userId, pickedPieceId) {
        let data = {userId: userId, pieceId: pickedPieceId};
        let sql = 'INSERT INTO cart SET ?';

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

module.exports = Cart;