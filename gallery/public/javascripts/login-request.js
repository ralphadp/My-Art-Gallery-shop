class LoginRequest {

    constructor(waitingID, usernameId, passwordId) {
        this.WAITING_GIF_ID = waitingID;
        this.USERNAME_ID = usernameId;
        this.PASSWORD_ID = passwordId;
    }

    /**
     * enable/disable waiting animated gif
     * @param {*} enable 
     */
    displayWaitingGif(enable) {
        const waitingGif = document.getElementById(this.WAITING_GIF_ID);
        waitingGif.style.display = enable ? 'block' : 'none';
    }

    /**
     * login request
     * @param {*} event 
     */
    login(event) {
        let requestConfig = {
            url: '/login/validation',
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            body: JSON.stringify({
                username: document.getElementById(this.USERNAME_ID).value,
                password: document.getElementById(this.PASSWORD_ID).value,
            })
        };

        this.displayWaitingGif(true);

        request(requestConfig)
        .then(data => {
            let response = JSON.parse(data);
            if (response.result) {
                //get the jwt token 
                window.location.replace(window.location.origin + '/');
            } else {
                alert (response.message);
            }
        })
        .catch(error => {
            console.log(error);
            alert (error); 
        })
        .finally(() => {
            this.displayWaitingGif(false);
        });

        if (event) {
            event.preventDefault();
        }
    }

    /**
     * Request a new password
     * @param {*} event 
     */
    newPassword(event) {
        let requestConfig = {
            url: '/login/forgoteen',
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            body: JSON.stringify({
                username: document.getElementById(this.USERNAME_ID).value
            })
        };

        this.displayWaitingGif(true);

        request(requestConfig)
        .then(data => {
            let response = JSON.parse(data);
            alert (response.message);
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            this.displayWaitingGif(false);
        });

        if (event) {
            event.preventDefault();
        }
    }

    /**
     * Compare Confirm password and Password
     */
    comparePassword() {
        const password = document.getElementById(this.PASSWORD_ID);
        const confirmPassword = document.getElementById('confirm_password');
        const message = document.getElementById('password_message');

        if (!password) {
            console.log('password input not defined');
            return false;
        }

        if (!confirmPassword) {
            console.log('confirmPassword input not defined');
            return false;
        }

        if (!message) {
            console.log('Message password not defined');
            return false;
        }

        if (!password.value.length && !confirmPassword.value) {
            message.innerHTML = '';
            return true;
        }

        if (password.value === confirmPassword.value) {
            message.innerHTML = 'Passwords match';
            message.style.color = 'green';
            return true;
        } else {
            message.innerHTML = 'Passwords does not match';
            message.style.color = 'red';
            return false;
        }
    }
};