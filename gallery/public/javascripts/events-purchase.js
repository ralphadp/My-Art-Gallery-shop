const saveChangesInPicked = () => {
    if (!document.getElementById('picked-total')) {
        return;
    }

    const unchecked = JSON.parse(document.getElementById('picked-total').getAttribute('unchecked'));
    const checked = JSON.parse(document.getElementById('picked-total').getAttribute('checked'));

    let requestConfig = {
        url: '/bought/updateActiveCarts',
        method: 'POST',
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify({
            unchecked: unchecked,
            checked: checked
        })
    };

    request(requestConfig)
    .then(result => {
        let response = JSON.parse(result);
        console.log(response.message);
    })
    .catch(error => {
        console.log(error);
    });
}

(() => 
{

    /**
     * Set all items selected in paypal form
     * @param {*} purchased
     */
    const addPaypalItems = (purchased) => {
        if (!purchased || !purchased.length) {
            console.log('No items to set on paypal form.');
            return;
        }

        let child = document.getElementById('business');

        function setPaypalItem(child, nameIndexed, value) {
            let input = document.createElement("input");
            input.setAttribute('TYPE', 'hidden');
            input.setAttribute('NAME', nameIndexed);
            input.setAttribute('id', nameIndexed);
            input.setAttribute('value', value);
            input.classList.add('item-paypal');
            child.after(input);
            //child.parentNode.insertBefore(input, child.nextSibling);
            return input;
        };

        purchased.filter(element=>element!==null).forEach((element, index) => {
            let paypalIndex = index + 1;
            child = setPaypalItem(child, 'item_name_' + paypalIndex, element.description);
            child = setPaypalItem(child, 'item_number_' + paypalIndex, element.custom_id);
            child = setPaypalItem(child, 'quantity_' + paypalIndex, '1');
            child = setPaypalItem(child, 'amount_' + paypalIndex, element.amount.value);
        });
    };

    /**
     * Remove all input elements form paypal form
     */
    const removePaypalItems = () => {
        const itemsPaypal =  document.querySelectorAll('.item-paypal');
        itemsPaypal.forEach(element => element.remove());
    };

    /**
     * Update the amount total of the cart
     * @param {*} total
     */
    const updatePayplaCartTotal = (total) => {
        document.getElementById('cart-total').value = total;
    }

    /* ATTACH / DETACH ITEM OF CART */

    const pieceCart = document.getElementsByClassName('attach-cart-item-checkbox');
    for (let index = 0; index < pieceCart.length; index++) {

        pieceCart.item(index).addEventListener('click', (event) => {
            //get purchase
            let purchased = JSON.parse(document.getElementById('picked-total').getAttribute('list'));
            let purchasePaused = JSON.parse(document.getElementById('picked-total').getAttribute('paused'));
            let unchecked = JSON.parse(document.getElementById('picked-total').getAttribute('unchecked'));
            let checked = JSON.parse(document.getElementById('picked-total').getAttribute('checked'));
            //get total
            let sum = Number(document.getElementById('amountSum').getAttribute('sum'));

            if (!event.currentTarget.checked) {
                //save item in temporaly array
                purchasePaused[index] = purchased[index]; 
                //remove from purchase list
                purchased[index] = null;
                //Add unselected 'carts' Ids
                checked.splice(checked.indexOf(Number(event.currentTarget.getAttribute('id'))), 1);
                unchecked.push(Number(event.currentTarget.getAttribute('id')));
                //Update last Total
                sum = sum - Number(event.currentTarget.getAttribute('amount'));
            } else {
                //return item to purchase list
                purchased[index] = purchasePaused[index];
                //remove item from temporaly array
                purchasePaused[index]= null;
                //remove unselected ids
                checked.push(Number(event.currentTarget.getAttribute('id')));
                unchecked.splice(unchecked.indexOf(Number(event.currentTarget.getAttribute('id'))), 1);
                //Update last Total
                sum = sum + Number(event.currentTarget.getAttribute('amount'));
            }
            //update total
            document.getElementById('amountSum').setAttribute('sum', sum.toFixed(2))
            document.getElementById('amountSum').innerHTML =`Total: ${sum.toFixed(2)} USD`;
            //set purchase
            document.getElementById('picked-total').setAttribute('list', JSON.stringify(purchased));
            document.getElementById('picked-total').setAttribute('paused', JSON.stringify(purchasePaused));
            document.getElementById('picked-total').setAttribute('unchecked', JSON.stringify(unchecked));
            document.getElementById('picked-total').setAttribute('checked', JSON.stringify(checked));
            //update paypal items
            removePaypalItems();
            addPaypalItems(purchased);
            updatePayplaCartTotal(sum.toFixed(2));
        });
    };

    /* Before unload page */
    window.onbeforeunload = function(event) {
    
        event = event || window.event;
        if (event) {
            saveChangesInPicked();
        }
    }
})();