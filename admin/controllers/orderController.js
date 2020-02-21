var {orders} = require('gallery-repository');
const services = require('../model/servicesPath');

module.exports = {
    getTransactions: (req, res, next) => {
        const order = new orders();
        order.getAll().then(result => {
            res.render(
                'orders', 
                { 
                    title: 'Trading', 
                    tableTitle: 'Transactions', 
                    data: result,
                    services: services
                }
            );
        });
    }
};