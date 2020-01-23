var sqlConn = require('../database/db');

class Cart {

    constructor() {
    }
    
    /**
     * Get all the possible trades from the current user set in the parameter userId
     * 
     * @param {*} userId 
     */
    getByUserId(userId) {
        let sql = 'SELECT cart.id, cart.userId, pieces.itemId as pieceId, pieces.name, cart.pickedAt, pieces.price, pieces.currency, cart.active FROM cart INNER JOIN pieces ON cart.pieceId = pieces.itemId WHERE userId = ?';

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
        let sql = "SELECT cart.id, cart.userId, pieces.itemId as pieceId, pieces.name, cart.pickedAt, cart.active FROM cart INNER JOIN pieces ON cart.pieceId = pieces.itemId";

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
     * Get all picked by year
     */
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
     * Picked grouped by Year and Mouth
     */
    getCountByYearMouth() {
        let sql = "SELECT YEAR(pickedAt) as Year, MONTHNAME(pickedAt) as Mouth, count(*) as Picked FROM cart GROUP BY MONTHNAME(pickedAt), YEAR(pickedAt)";

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

    /**
     * Used to change the active column in batch
     * @param {*} state 
     * @param {*} list 
     */
    updateActive(state, list) {
        let elements = '-1';
        if (list && list.length) {
            elements = list.join(',');    
        }

        let sql = `UPDATE cart SET active = ${state} WHERE id IN (${elements})`;

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
     * Set to inactive some cart elements
     * @param {*} inactiveList 
     */
    updateToInactive(inactiveList) {

        return this.updateActive(0, inactiveList);
    }

    /**
     * Update to Active
     * @param {*} activeList 
     */
    updateToActive(activeList) {

        return this.updateActive(1, activeList);
    }

    /**
     * Remove a bulk of pieces from cart
     * @param {*} pieces
     */
    batchDelete(pieces) {
        let ids = '"-1"';
        if (pieces && pieces.length) {
            ids = '"' + pieces.join('","') + '"';
        }

        let sql = `DELETE FROM cart WHERE pieceId IN (${ids})`;

        return new Promise((resolve, reject) => {
            sqlConn.query(sql, [pieces], (err, result) => {
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