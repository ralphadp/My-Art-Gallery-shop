class Email {
    constructor(WAITING_GIF_ID, EMAIL_ID, NAME_ID, DESCRIPTION_ID) {
        this.waitingGif = document.getElementById(WAITING_GIF_ID);
        this.email = document.getElementById(EMAIL_ID);
        this.name = document.getElementById(NAME_ID);
        this.description = document.getElementById(DESCRIPTION_ID);
    }

    showWaitGif(enable) {
        this.waitingGif.style.display = enable ? 'block' : 'none';
    }

    send() {

        let requestConfig = {
            url: '/send-message/',
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            body: JSON.stringify({
                email: this.email.value,
                name: this.name.value,
                description: this.description.value
            })
        };

        this.showWaitGif(true);
        request(requestConfig)
        .then(data => {
            let response = JSON.parse(data);
            alert (response.message.response);
        })
        .catch(error => {
            console.log(error);
        })
        .finally(()=> {
            this.showWaitGif(false);
        });
    }
}