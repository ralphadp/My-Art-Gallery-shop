var express = require('express');
var tokenCheck = require('../helpers/tokenCheck');
const {orders, carts, pieces} = require('gallery-repository');
const {keys, middlewareManager} = require('../helpers/middleware/manager');
const {parsePaypalCartReturnData} = require('../helpers/middleware/tasks/util/utilities');
const service = require('../helpers/servicesPath');
var router = express.Router();

/* POST save Paypal Orders. */
/* Request body:
    ·orderId
    ·pieceId
    ·pieceDescription
    ·userExternalId
    ·paypalBuyTimestamp
    ·payerId
    ·payerAmount
    ·payerCurrency
    ·payerCompleteName
    ·rawDetails
*/
router.post('/save', tokenCheck, function(req, res, next) {

    let response = {};
    //TODO: Save in another part if the data is lost in the request or server
    console.log('save data: ', req.body);

    try {
        const order = new orders();
        order.save(req.body)
        .then(result => {
            if (result.affectedRows) {
                response = {
                    success: true,
                    message: 'The orders were saved successfully.'
                };
                const piece = new pieces();
                piece.bought(req.body.pieceId)
                .then(result => console.log(result.affectedRows ? `Piece [${req.body.pieceId}] WAS BOUGHT`: `Cannot save [${req.body.pieceId}] after it was bought.`))
                .catch(error => console.log('Bought piece error: ', error));
                const cart = new carts();
                cart.delete(req.body.pieceId)
                .then(result => console.log(result.affectedRows ? `Piece [${req.body.pieceId}] removed from cart`: `Cannot remove [${req.body.pieceId}] after it was bought from cart.`))
                .catch(error => console.log('Remove piece from cart after bought error: ', error));
            } else {
                response = {
                    success: false,
                    message: 'The orders were not saved. ' + result.sqlMessage
                };
            }
        })
        .catch(error => {
            console.log(error);
            response = {
                success: false,
                message: error.message
            };
        })
        .finally(() => {
            res.send(response);
        });
    } catch(error) {
        console.log(error);
    }
});

/* GET orders summary. To check the orders paypal */
router.get('/', tokenCheck, function(req, res, next) {

    middlewareManager({
        key: keys.BOUGHT,
        currentUser: req.session,
        resolve: (error, payload) => {

            if (error) {
                res.locals.message = 'Error';
                res.locals.error = payload;
                res.status(500);
                res.render('error', {message:'not found', error: "error", status: 404, service: service});
            } else {
                payload.titlePage = 'Bought Pieces';
                payload.tableTitle = 'Orders';
                payload.service = service;

                res.render('bought', payload);
            }
        }
    });

});

/* POST store selected items for Paypal. */
router.post('/updateActiveCarts', tokenCheck, async function(req, res, next) {

    const unchecked = req.body.unchecked || null;
    const checked = req.body.checked || null;
    let response = {};

    try {

        const cart = new carts();
        const resultUnchecked = await cart.updateToInactive(unchecked);
        const resultChecked = await cart.updateToActive(checked);

        if (resultUnchecked.affectedRows || resultChecked.affectedRows) {
            response = {
                success: true,
                message: `Carts were changed; inactive: ${resultUnchecked.affectedRows}, active: ${resultChecked.affectedRows}`
            };
        } else {
            response = {
                success: false,
                message: `${resultUnchecked.message} ${resultChecked.message}`
            };
        }
    } catch (error) {
        console.log(error);
        response = {
            success: false,
            message: error
        };
    }

    res.send(response);
});

/* POST store cart paypal payment data */
router.post('/cart-done', tokenCheck, async function(req, res, next) {

    console.log(req.body);
    const paypal_return_contents = req.body || null;

    const rows = parsePaypalCartReturnData(
            req.session.userExtId, 
            paypal_return_contents
    );

    console.log(rows);

    try {
        const order = new orders();
        order.saveBatch(rows.order)
        .then(result => {
            if (result.affectedRows) {
                response = {
                    success: true,
                    message: 'The orders were saved successfully.'
                };
                const piece = new pieces();
                piece.batchBought(rows.piece)
                .then(result => console.log(result.affectedRows ? `Cart pieces [${rows.piece}] WERE BOUGHT`: `Cannot save cart pieces [${rows.piece}] after it was bought.`))
                .catch(error => console.log('Bought cart pieces error: ', error));
                const cart = new carts();
                cart.batchDelete(rows.piece)
                .then(result => console.log(result.affectedRows ? `Pieces [${rows.piece}] removed from cart`: `Cannot remove [${req.body.pieceId}] after they were bought from cart.`))
                .catch(error => console.log('Remove pieces from cart after bought error: ', error));
            } else {
                response = {
                    success: false,
                    message: 'The orders were not saved. ' + result.sqlMessage
                };
            }
        })
        .catch(error => {
            console.log(error);
            response = {
                success: false,
                message: error.message
            };
        })
        .finally(() => {
            res.redirect('/bought');
        });
    } catch(error) {
        console.log(error);
        res.redirect('/');
    }
});

module.exports = router;
