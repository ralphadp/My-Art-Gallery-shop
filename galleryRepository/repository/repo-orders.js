var sqlConn = require('../database/db');

class Orders {

    constructor() {
    }

    /**
     * Select a single order
     * @param {*} orderId 
     */
    getByOrderId(orderId) {
        
        let sql = 'SELECT * FROM orders WHERE orderId = ?';

        return new Promise((resolve, reject) => {
            sqlConn.query(sql, [orderId], (err, result) => {
                if (!err) {
                    resolve(JSON.parse(JSON.stringify(result)));
                } else {
                    reject(err);
                }
            });
        });
    }

    /**
     * Get all the orders by external user id
     */
    getAllByUserId(userExtId) {
        let sql = "SELECT * FROM orders WHERE userExternalId = ?";

        return new Promise((resolve, reject) => {
            sqlConn.query(sql, [userExtId], (err, result) => {
                if (!err) {
                    resolve(JSON.parse(JSON.stringify(result)));
                } else {
                    reject(err);
                }
            });
        });
    }

}

module.exports = Orders;