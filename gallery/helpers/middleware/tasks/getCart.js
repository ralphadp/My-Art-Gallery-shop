const {carts} = require('galleryRepository');

const getCart = (context, next) => {

    const oCart = new carts();
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