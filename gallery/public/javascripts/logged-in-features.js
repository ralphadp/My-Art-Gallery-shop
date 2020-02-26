(() => 
{
    /********************************LOGGED IN***************************************************************/

    const availableFrame = new Frame('list');
    const pickedFrame = new Frame('cart-picking');

    pickedFrame.onClose = (event) => {
        if (typeof saveChangesFromMyCart !== 'undefined') {
            saveChangesFromMyCart();
        } else {
            console.log('Cannot save changes from My Cart');
        }
    }

    /***********************************************************************************************/

    /*LIST PIECE */

    document.getElementById("open-list").addEventListener('click', () => availableFrame.show());
    document.getElementById("open-list-footer").addEventListener('click', () => availableFrame.show());

    /*PICKED PIECES */

    document.getElementById("open-picked").addEventListener('click', () => pickedFrame.show());
    document.getElementById("open-picked-footer").addEventListener('click', () => pickedFrame.show());

    /*CHOOSE A PIECE AND PUT INTO YOUR CART */

    const thumbCheckbox = document.getElementsByClassName("thumb-checkbox");
    for (let index = 0; index < thumbCheckbox.length; index++) {
        thumbCheckbox.item(index).addEventListener('click', (event) => {
            var checkbox = event.target;
            const configRequest = {
                url: SERVER_CONFIG.appHost 
                + (checkbox.checked ? "/cart/add-to/" : "/cart/remove-from/") 
                + checkbox.id 
            };

            request(configRequest)
            .then(data => {
                let response = JSON.parse(data);
                alert (response.message);
            })
            .catch(error => {
                console.log(error);
            });
            
        }, false);
    }

})();