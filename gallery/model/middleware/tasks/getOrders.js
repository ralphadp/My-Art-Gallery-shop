const {orders} = require('gallery-repository');

const getOrders = (context, next) => {

    const order = new orders();

    order.getAllByUserId(context.currentUser.userExtId)
    .then(ordersInfo => {

        context.orders = ordersInfo;

        next(null, context.orders);
    })
    .catch(error => {
        throw error;
    });
};

module.exports = getOrders;