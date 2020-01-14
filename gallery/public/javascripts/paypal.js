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
        invoice_id: USER_ID,//Num Factura ID (formal)
        bill_id: '', //Factura o recibo o ticket (informal)
        amount: {
            currency_code: 'USD',
            value: priceUSD
        }
    };

    paypal.Buttons({
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [
                    {
                        custom_id: piece.itemId,
                        description: piece.name,
                        amount: {
                            currency_code: 'USD',
                            value: priceUSD
                        }
                    }
                ]
            });
        },
        onApprove: function(data, actions) {

            return actions.order.capture().then(function(details) {
                alert('Transaction [' + data.orderID + '] completed by ' + details.payer.name.given_name + ' ' + details.payer.name.surname);

                //TODO: Save raw data in double storage if the data is lost in the request or server 

                request({
                    url: '/bought/save',
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8"
                    },
                    body: JSON.stringify({
                        orderId: data.orderID,
                        pieceId: piece.itemId,
                        pieceDescription: details.purchase_units[0].description,
                        userExternalId: USER_ID,
                        paypalBuyTimestamp: details.create_time,
                        payerId: data.payerID,
                        payerAmount: details.purchase_units[0].amount.value,
                        payerCurrency: details.purchase_units[0].amount.currency_code,
                        payerCompleteName: details.payer.name.given_name + ' ' + details.payer.name.surname,
                        rawDetails: JSON.stringify(details)
                    })
                }).then(result => {
                    let response = JSON.parse(result);
                    alert(response.message);
                    window.location.replace(window.location.origin + '/');
                }).catch(error => {
                    alert(error);
                });
            });
        },
        onError: function (error) {
            alert(error);
        }
    }).render('#paypal-button-container');

};