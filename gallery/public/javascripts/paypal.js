/**
 * Set the paypal button to checkout 
 * @param {*} piece 
 */
const setPaypalPurchase = (piece) => {

    document.getElementById('paypal-button-container').innerHTML = '';

    if (piece.picked === 'PRIVATE') {
        return;
    }

    let priceUSD = piece.price;
    if (piece.currency === 'BOB') {
        priceUSD = (piece.price / 6.94).toFixed(2)
    }

    let unit = {
        custom_id: piece.itemId,
        description: piece.name,
        invoice_id: USER_ID,
        amount: {
            currency_code: 'USD',
            value: priceUSD
        }
    };

    paypal.Buttons({
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [
                    unit
                ]
            });
        },
        onApprove: function(data, actions) {

            return actions.order.capture().then(function(details) {
                alert('Transaction [' + data.orderID + '] completed by ' + details.payer.name.given_name);

                return request('/bought/save', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify([{
                        orderId: data.orderID,
                        pieceId: piece.itemId,
                        userExternalId: USER_ID   
                    }])
                });
            });
        }
    }).render('#paypal-button-container');

};