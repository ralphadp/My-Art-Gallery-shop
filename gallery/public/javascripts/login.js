(() => 
{
    /* LOGIN AN USER */

    document.getElementById('login-user').addEventListener('click', () => {

        let requestConfig = {
            url: '/login/validation',
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            body: JSON.stringify({
                username: document.getElementById('username').value,
                password: document.getElementById('password').value,
            })
        };

        document.getElementById('waiting-login-response').style.display = 'block';
        request(requestConfig)
        .then(data => {
            document.getElementById('waiting-login-response').style.display = 'none';
            let response = JSON.parse(data);
            if (response.result) {
                //get the jwt token 
                window.location.replace(window.location.origin + '/');
            } else {
                alert (response.message);
            }
        })
        .catch(error => {
            document.getElementById('waiting-login-response').style.display = 'none';
            console.log(error);
            alert (error); 
        });

    });

    document.getElementById('forgoteen-email').addEventListener('click', () => {

        let requestConfig = {
            url: '/login/send-forgoteen',
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            body: JSON.stringify({
                username: document.getElementById('username').value,
                password: document.getElementById('password').value,
            })
        };

        document.getElementById('waiting-login-response').style.display = 'block';
        request(requestConfig)
        .then(data => {
            document.getElementById('waiting-login-response').style.display = 'none';
            let response = JSON.parse(data);
            alert (response.message.response);
        })
        .catch(error => {
            document.getElementById('waiting-login-response').style.display = 'none';
            console.log(error);
        });

    });

})();