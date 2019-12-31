(() => 
{
    /* REGISTER A NEW USER */

    document.getElementById('register-user').addEventListener('click', () => {

        let form = document.getElementById('register-form');
        var fd = new FormData(form);

        let requestConfig = {
            url: '/register/new',
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            body: JSON.stringify(Object.fromEntries(fd))
        };

        document.getElementById('waiting-register-response').style.display = 'block';
        request(requestConfig)
        .then(data => {
            document.getElementById('waiting-register-response').style.display = 'none';
            let response = JSON.parse(data);
            alert (response.message);
        })
        .catch(error => {
            document.getElementById('waiting-register-response').style.display = 'none';
            console.log(error);
            alert (error);
        });

    });

})();