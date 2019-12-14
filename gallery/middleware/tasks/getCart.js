const cartRepo = require('../../repository/repo-cart');

const getCart = (context, next) => {

    const oCart = new cartRepo();
    oCart.getById(global.currentUser)
    .then(picked => {

        context.cart = picked;

        next(null, context.cart);
    })
    .catch(error => {
        throw error;
    });
};

module.exports = getCart;