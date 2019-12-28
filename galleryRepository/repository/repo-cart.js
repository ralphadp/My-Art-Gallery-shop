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
        let sql = 'SELECT cart.id, cart.userId, pieces.itemId as pieceId, pieces.name, pickedAt FROM cart INNER JOIN pieces ON cart.pieceId = pieces.itemId WHERE userId = ?';

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
        let sql = "SELECT cart.id, cart.userId, pieces.itemId as pieceId, pieces.name, pickedAt FROM cart INNER JOIN pieces ON cart.pieceId = pieces.itemId";

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

    getCountByYear() {
        let sql = "SELECT YEAR(pickedAt) as Year, count(id) as Picked FROM cart GROUP BY YEAR(pickedAt)";

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
     * @param {*} pickedAt 
     */
    save(userId, pickedPieceId, pickedAt) {
        let data = {
            userId: userId, 
            pieceId: pickedPieceId,
            pickedAt: pickedAt
        };

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