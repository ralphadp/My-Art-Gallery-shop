(() => 
{
    class registerAccount {

        constructor(waitingID, formId, previewId) {
            this.WAITING_GIF_ID = waitingID;
            this.FORM_ID = formId;
            this.PREVIEW_ID = previewId;
        }

        /**
         * Verify the image type
         */
        doesIncludeImage() {
            let input = document.querySelector('input[type=file]');
            let file = input.files[0];

            if (!file || !file.type.match(/image.*/)) {
                
                return false;
            }

            return true;
        }

        /**
         * Verify the requiered data in the form
         * @param {*} formdata 
         */
        verifyRequired(formdata) {
            if (!formdata.get('accept_legal')) {
                alert ('You must accept the legal rules');
                return false;
            }

            return true;
        }

        /**
         * Tootle password input visility 
         */
        tooglePassword() {
            const password = document.getElementById('password');
            const icon = document.getElementById('eye-icon');
            if (password.type === 'password') {
                password.type = 'text';
                icon.classList.remove("fa-eye-slash");
                icon.classList.add("fa-eye");
            } else {
                password.type = 'password'
                icon.classList.remove("fa-eye");
                icon.classList.add("fa-eye-slash");
            }
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
         * Get the all the data form 
         */
        getFormdata() {
            let form = document.getElementById(this.FORM_ID);
            return new FormData(form);
        }

        /**
         * Register new account user Info
         * @param {*} fd 
         * @param {*} message 
         */
        registerUser(fd, messageExtended = null) {
            const requestConfig = {
                url: '/register/new',
                method: 'POST',
                headers: {
                    "Content-Type": "application/json;charset=UTF-8"
                },
                body: JSON.stringify(Object.fromEntries(fd))
            };

            request(requestConfig)
            .then(data => {
                this.displayWaitingGif(false);
                const response = JSON.parse(data);

                alert ((messageExtended ? (messageExtended + '\n') : '') + response.message);
                if (response.result) {
                    window.location.replace(window.location.origin + '/');
                } else {
                    console.log('Couln not register user info.');
                }
            })
            .catch(error => {
                this.displayWaitingGif(false);
                console.log(error);
                alert (error);
            });
        }

        /**
         * Register new account user photo
         * @param {*} fd 
         * @param {*} nextRegister 
         */
        registerPhotoUser(fd, nextRegister) {

            let requestConfig = {
                url: 'http://localhost:8888/api/register/upload',
                method: 'POST',
                headers: {
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3"
                },
                body: fd
            };

            request(requestConfig)
            .then(data => {
                const response = JSON.parse(data);
                const messageImage = response.message;

                if (response.result) {
                    const photoId = response.code;
                    fd.append('photo', photoId);
                    
                } else {
                    console.log('Could not save user image.');
                } 
                //Next step, register user data
                this.registerUser(fd, messageImage)
            })
            .catch(error => {
                this.displayWaitingGif(false);
                console.log(error);
                alert (error);
            });
        }

        /**
         * Main function to register an account
         * @param {*} event 
         */
        registerNewAccount(event) {

            const fd = this.getFormdata();
            
            if (!this.verifyRequired(fd)) {
                return false;
            }

            this.displayWaitingGif(true);

            if (!this.doesIncludeImage()) {
                console.log('Warning: The file is not present or is not an image.');
                this.registerUser(fd);
            } else {
                this.registerPhotoUser(fd, this.registerUser);
            }

            if (event) {
                event.preventDefault();
            }
        };

        /**
         * Set the upload image preview
         * @param {*} event 
         */
        displayPreviewPhoto(event) {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            let i=this.PREVIEW_ID;
            reader.onload = (res) => {
                const preview = document.getElementById(this.PREVIEW_ID);
                const image = document.createElement('img');
                image.src = reader.result;
                preview.innerHTML = '';
                preview.append(image);
            };
        };
    };

    const account = new registerAccount('waiting-register-response', 'register-form', 'preview');

    /* REGISTER A NEW USER ACCOUNT */
    document.getElementById('register-form').onsubmit = account.registerNewAccount.bind(account);

    /* DISPLAY USER PREVIEW IMAGE TO UPLOAD */
    document.getElementById('user-photo').onchange = account.displayPreviewPhoto.bind(account);

    /* TOOGLE PASSWORD VISIVILITY */
    document.getElementById('eye').onclick = account.tooglePassword.bind(account);

})();