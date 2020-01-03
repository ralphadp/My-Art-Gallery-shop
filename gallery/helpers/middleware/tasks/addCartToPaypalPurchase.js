var bigDecimal = require('js-big-decimal');
"use strict";

const addCartToPaypalPurchase = (context, next) => {
    const TARGET_CURRENCY = 'USD';
    var rateChange = new bigDecimal(6.94);
    let TOTAL = 0;
    let unchecked = [];
    let checked = [];
    let purchasePaused = [];
    let purchaseList = [];

    context.cart.forEach((element, index, arrayCart) => {
        var original = new bigDecimal(element.price);
        let price = (element.currency === 'BOB') ? original.divide(rateChange).round(2).getValue() : original.round(2).getValue();
        arrayCart[index].USDprice = price;

        const purchaseItem = {
            custom_id: element.pieceId,
            description: element.name,
            invoice_id: element.userId,
            amount: {
                currency_code: TARGET_CURRENCY,
                value: price
            }
        };

        if (!element.active) {
            unchecked.push(element.id);
            purchasePaused.push(purchaseItem);
        } else {
            TOTAL += Number(price);
            checked.push(element.id);
            purchaseList.push(purchaseItem);
        }

    });

    context.purchasePaused = JSON.stringify(purchasePaused);
    context.purchaseItems = JSON.stringify(purchaseList);
    context.unchecked  = JSON.stringify(unchecked);
    context.checked  = JSON.stringify(checked);

    var nTotal = new bigDecimal(TOTAL);
    context.totalPurchase = nTotal.round(2).getValue();

    next(null, context.purchaseItems);
    
};

module.exports = addCartToPaypalPurchase;