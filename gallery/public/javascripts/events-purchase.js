(() => 
{
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
                purchased.splice(index, 1);
                //Add unselected 'carts' Ids
                checked.splice(checked.indexOf(event.currentTarget.getAttribute('id')), 1);
                unchecked.push(Number(event.currentTarget.getAttribute('id')));
                //Update last Total
                sum = sum - Number(event.currentTarget.getAttribute('amount'));
            } else {
                //return item to purchase list
                purchased.splice(index, 0, purchasePaused[index]);
                //remove item from temporaly array
                purchasePaused.splice(index, 1);
                //remove unselected ids
                checked.push(Number(event.currentTarget.getAttribute('id')));
                unchecked.splice(unchecked.indexOf(event.currentTarget.getAttribute('id')), 1);
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
        });
    };

    /* Before unload page */
    window.onbeforeunload = function(event) {
    
        event = event || window.event;
        if (event) {
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

    }
})();