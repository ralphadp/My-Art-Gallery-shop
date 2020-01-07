var express = require('express');
var tokenCheck = require('../helpers/tokenCheck');
const {orders, carts} = require('galleryRepository');
const {keys, middlewareManager} = require('../helpers/middleware/manager');
const {parsePaypalCartReturnData} = require('../helpers/middleware/tasks/util/utilities');
var router = express.Router();

/* POST save Paypal Orders. */
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
    console.log(req.body);

    middlewareManager({
        key: keys.BOUGHT,
        currentUser: req.session,
        resolve: (error, payload) => {

            if (error) {
                res.locals.message = 'Error';
                res.locals.error = payload;
                res.status(500);
                res.render('error', {message:'not found', error: "error", status: 404});
            } else {
                payload.titlePage = 'Bought Pieces';
                payload.tableTitle = 'Orders';

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

/* POST store paypal payment data */
router.post('/cart-done', tokenCheck, async function(req, res, next) {

    console.log(req.body);
    const paypal_return_contents = req.body || null;

    const ordersRows = parsePaypalCartReturnData(
            req.session.userExtId, 
            paypal_return_contents
    );

    console.log(ordersRows);

    try {
        const order = new orders();
        order.saveBatch(ordersRows)
        .then(result => {
            if (result.affectedRows) {
                response = {
                    success: true,
                    message: 'The orders were saved successfully.'
                };    
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
