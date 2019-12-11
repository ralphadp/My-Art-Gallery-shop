var express = require('express');
const cartRepo = require('../repository/repo-cart');
var router = express.Router();

/* GET Add to cart. */
router.get('/add-to/:pieceId', function(req, res, next) {

    let response;
    try {
        const oCart = new cartRepo();
        oCart.save(global.currentUser, req.params.pieceId)
        .then(result => {
            if (result.affectedRows === 1) {
                response = {
                    success: true,
                    message: `The piece [${req.params.pieceId}] was accepted successfully in your cart.`
                };    
            } else {
                response = {
                    success: true,
                    message: `The piece [${req.params.pieceId}] was NOT accepted in your cart. Please contact your Admin.`
                };    
            }
            res.send(response);
        })
        .catch(error => {
            response = {
                success: false,
                message: error.message
            };

            res.send(response);
        });
       
    } catch (error) {

        response = {
            success: false,
            message: error.message
        };
        res.send(response);
    }

});

/* GET Remove from cart. */
router.get('/remove-from/:pieceId', function(req, res, next) {

    let response;
    try {
        const oCart = new cartRepo();
        oCart.delete(req.params.pieceId)
        .then(result => {
            response = {
                success: true,
                message: `The piece [${req.params.pieceId}] was removed from cart successfully`
            };
            res.send(response);
        })
        .catch(error => {
            response = {
                success: false,
                message: error.message
            };

            res.send(response);
        });
       
    } catch (error) {

        response = {
            success: false,
            message: error.message
        };
        res.send(response);
    }

});


module.exports = router;
