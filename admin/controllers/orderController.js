var {orders} = require('gallery-repository');

module.exports = {
    getTransactions: (req, res, next) => {
        const order = new orders();
        order.getAll().then(result => {
            res.renderPage(
                'orders', 
                { 
                    title: 'Trading', 
                    tableTitle: 'Transactions', 
                    data: result
                }
            );
        });
    }
};