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

    /**
     * Save a captured paypal order
     * @param {*} order 
     */
    save(order) {
        let data = {
            orderId: order.orderId, 
            pieceId: order.pieceId,
            pieceDescription: order.pieceDescription,
            userExternalId: order.userExternalId,
            paypalBuyTimestamp: order.paypalBuyTimestamp,
            payerId: order.payerId,
            payerCompleteName: order.payerCompleteName,
            payerAmount: order.payerAmount,
            payerCurrency: order.payerCurrency,
            rawDetails: order.rawDetails
        };

        let sql = 'INSERT INTO orders SET ?';

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
     * Save a bulk of orders, used in the Cart buy
     * @param {*} orders array
     */
    saveBatch(orders) {

        let sql = 'INSERT INTO orders(orderId, pieceId, pieceDescription, userExternalId, paypalBuyTimestamp, payerId, payerCompleteName, rawDetails, payerAmount, payerCurrency) VALUES ?';
        
        return new Promise((resolve, reject) => {
            sqlConn.query(sql, [orders], (err, result) => {
                if (!err) {
                    resolve(JSON.parse(JSON.stringify(result)));
                } else {
                    reject(err);
                }
            });
        });
    }

    /**
     * Get all the traansactions history
     */
    getAll() {
        let sql = "SELECT * FROM orders";

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
     * Get the total profit Total and from last month
     */
    getTotals() {
        let sql = 
        "SELECT (SELECT CONCAT(sum(payerAmount), CONCAT(' ', payerCurrency)) FROM orders WHERE pieceId = 'Total' GROUP BY payerCurrency) AS cartTotal, " +
        "(SELECT CONCAT(sum(payerAmount), CONCAT(' ', payerCurrency)) FROM orders WHERE pieceId <> 'Total' GROUP BY payerCurrency) AS Total, " +
        "(SELECT CONCAT(sum(payerAmount), CONCAT(' ', payerCurrency)) FROM orders WHERE pieceId = 'Total' AND MONTH(buyDatetime) = MONTH(CURRENT_DATE()) AND YEAR(buyDatetime) = YEAR(CURRENT_DATE()) GROUP BY payerCurrency) AS currentMonthCartTotal, " +
        "(SELECT CONCAT(sum(payerAmount), CONCAT(' ', payerCurrency)) FROM orders WHERE pieceId <> 'Total' AND MONTH(buyDatetime) = MONTH(CURRENT_DATE()) AND YEAR(buyDatetime) = YEAR(CURRENT_DATE()) GROUP BY payerCurrency) AS currentMonthTotal";

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
     * Get the totals by month for a single year
     * @param {*} year 
     */
    getTotalsByMonth(year) {
        let sql = "SELECT MONTHNAME(buyDatetime) AS month, sum(payerAmount) AS total, payerCurrency FROM orders WHERE pieceId <> 'Total' AND YEAR(buyDatetime) = ? GROUP BY MONTHNAME(buyDatetime), payerCurrency";
        
        return new Promise((resolve, reject) => {
            sqlConn.query(sql, [year], (err, result) => {
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