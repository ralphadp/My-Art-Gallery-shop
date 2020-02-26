const {carts} = require('gallery-repository');

const getCart = (context, next) => {

    const oCart = new carts();

    oCart.getByUserId(context.currentUser.userExtId)
    .then(picked => {

        context.cart = picked;

        next(null, context.cart);
    })
    .catch(error => {
        throw error;
    });
};

module.exports = getCart;