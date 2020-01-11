(() => 
{
    /**
     * Verify the image type
     */
    const verifyImage = () => {
        let input = document.querySelector('input[type=file]');
        let file = input.files[0];

        if (!file || !file.type.match(/image.*/)) {
            alert ('The file is not present or is not an image.');
            return false;
        }

        return true;
    }

    /**
     * Verify the requiered data in the form
     * @param {*} formdata 
     */
    const verifyRequired = (formdata) => {
        if (!formdata.get('accept_legal')) {
            alert ('You must accept the legal rules');
            return false;
        }

        return true;
    }

    /**
     * enable/disable waiting animated gif
     * @param {*} enable 
     */
    const displayWaitingGif = (enable) => {
        const waitingGif = document.getElementById('waiting-register-response');
        waitingGif.style.display = enable ? 'block' : 'none';
    }

    /* REGISTER A NEW USER */

    document.getElementById('register-user').addEventListener('click', () => {

        if (!verifyImage()) {
            return false;
        }

        let form = document.getElementById('register-form');
        let fd = new FormData(form);

        if (!verifyRequired(fd)) {
            return false;
        }

        displayWaitingGif(true);

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

                requestConfig = {
                    url: '/register/new',
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8"
                    },
                    body: JSON.stringify(Object.fromEntries(fd))
                };

                request(requestConfig)
                .then(data => {
                    displayWaitingGif(false);
                    const response = JSON.parse(data);
                    alert (messageImage + '\n' + response.message);
                    if (response.result) {
                        window.location.replace(window.location.origin + '/');
                    }
                })
                .catch(error => {
                    displayWaitingGif(false);
                    console.log(error);
                    alert (error);
                });
            }
        })
        .catch(error => {
            displayWaitingGif(false);
            console.log(error);
            alert (error);
        });

    });

    /* Display preview user image */

    document.getElementById('user-photo').onchange = (event) => {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (res) => {
            const preview = document.getElementById('preview');
            const image = document.createElement('img');
            image.src = reader.result;
            preview.innerHTML = '';
            preview.append(image);
        };
    };

})();