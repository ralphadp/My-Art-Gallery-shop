var express = require('express');
const {carts} = require('galleryRepository');
var tokenCheck = require('../helpers/tokenCheck');
var router = express.Router();

/* GET Add to cart. */
router.get('/add-to/:pieceId', tokenCheck, function(req, res, next) {

    let response;
    try {
        const oCart = new carts();
        oCart.save(req.session.userExtId, req.params.pieceId)
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
router.get('/remove-from/:pieceId', tokenCheck, function(req, res, next) {

    let response;
    try {
        const oCart = new carts();
        oCart.delete(req.params.pieceId)
        .then(result => {
            if (result.affectedRows === 1) {
                response = {
                    success: true,
                    message: `The piece [${req.params.pieceId}] was removed from cart successfully`
                };
            } else {
                response = {
                    success: true,
                    message: `The piece [${req.params.pieceId}] could NOT be removed from your cart. Please contact your Admin.`
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


module.exports = router;
