(() => 
{
    /* SEND AN EMAIL */

    document.getElementById('send-us-email').addEventListener('click', () => {

        let requestConfig = {
            url: '/send-message/',
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            body: JSON.stringify({
                email: document.getElementById('msg-email').value,
                name: document.getElementById('msg-name').value,
                description: document.getElementById('msg-description').value
            })
        };

        document.getElementById('waiting-email-response').style.display = 'block';
        request(requestConfig)
        .then(data => {
            document.getElementById('waiting-email-response').style.display = 'none';
            let response = JSON.parse(data);
            alert (response.message.response);
        })
        .catch(error => {
            document.getElementById('waiting-email-response').style.display = 'none';
            console.log(error);
        });

    });

})();