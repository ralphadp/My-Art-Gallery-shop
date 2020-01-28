
class ThumbUploader {

    constructor (FORM_ID, PREVIEW_ID, ELEMENT_TO_UPDATE_ID) {
        this.FORM_ID = FORM_ID;
        this.PREVIEW_ID = PREVIEW_ID;
        this.ELEMENT_TO_UPDATE_ID = ELEMENT_TO_UPDATE_ID;
    }

    /**
     * In case image upload was good, set the user photo
     * @param {*} response 
     */
    uploadSuccess (response) {
        let thumbId = 'SERVER ERROR, none filename code returned from server.';
        if (response.files.length) {
            thumbId = response.files[0].split('.')[0];    
        }
        document.getElementById(this.ELEMENT_TO_UPDATE_ID).value = thumbId;

        alert(response.message);
    };

    /**
     * In case the failure, show the error
     * @param {*} responseError 
     */
    uploadFail (responseError) {
        alert(responseError.message);
    };

    /**
     * Main function to upload the image in the external microservice 
     * @param {*} path 
     */
    upload (path) {

        let input = document.querySelector('input[type=file]');
        let file = input.files[0];//taking only one

        if (!file || !file.type.match(/image.*/)) {
            this.uploadFail ({
                result: false,
                message: 'The file is not present or is not an image.'
            });

            return false;
        }

        let form = document.getElementById(this.FORM_ID);
        var fd = new FormData(form);

        request({
            method: "POST",
            url: `${SERVER_CONFIG.imagesHost}/api/${path}/upload/`,
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3'
            },
            body: fd,
            result: 'object'
        })
        .then(result => {
            this.uploadSuccess(result);
        })
        .catch(result => {
            this.uploadFail(result);
        });

    };

    /**
     * Show the preview thumb in the IMG of PREVIEW_ID element
     * @param {*} event 
     */
    displayPreviewPhoto (event) {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);

        reader.onload = (res) => {
            const preview = document.getElementById(this.PREVIEW_ID);
            if (preview.getElementsByTagName('img').length) {
                preview.getElementsByTagName('img')[0].src = reader.result;
            } else {
                const image = document.createElement('img');
                image.src = reader.result;
                preview.innerHTML = '';
                preview.append(image);
            }
        };
    };

    /**
     * Upload the image process
     * @param {*} event 
     */
    uploadEvent (event) {
        this.upload(
            event.currentTarget.getAttribute('path')
        );
    };
};
