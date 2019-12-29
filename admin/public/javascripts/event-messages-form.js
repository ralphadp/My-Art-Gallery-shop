(() => {

    const messageButton = document.getElementsByClassName('message-button');

    for (let index = 0; index < messageButton.length; index++) {
        let button = messageButton.item(index);
        if (button.getAttribute('id') === 'hide-message') {
            button.addEventListener('click', (event) => {
                const CODE = event.currentTarget.getAttribute('code');
                document.getElementById('message-complete-' + CODE).style.display = 'none';
                document.getElementById('message-title-' + CODE).style.display = 'inline-block';
            });
        } else if (button.getAttribute('id') === 'show-message') {
            button.addEventListener('click', (event) => {
                const CODE = event.currentTarget.getAttribute('code');
                document.getElementById('message-complete-' + CODE).style.display = 'inline-block';
                document.getElementById('message-title-' + CODE).style.display = 'none';
                /*GET CODE the server */
                request({url: "message/reading/" + CODE})
                        .then(data => {
                            let response = JSON.parse(data);
                            console.log (response.message);
                            if (response.result) {
                                document.getElementById('unread-messages-count').innerHTML = response.unreaded; 
                                document.getElementById('message-complete-' + CODE).style.background = 'transparent';
                                document.getElementById('message-title-' + CODE).style.background = 'transparent';
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
            });
        }
    }

})();