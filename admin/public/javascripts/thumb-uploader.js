(() => {

    /**
     * Main function to upload the image in the external microservice 
     * @param {*} path 
     * @param {*} callback 
     * @param {*} fallback 
     */
    const upload = (path, callback, fallback) => {

        let input = document.querySelector('input[type=file]');
        let file = input.files[0];//taking only one

        if (!file || !file.type.match(/image.*/)) {
            if (fallback) {
                fallback ({error: 'The file is not present or is not an image.'});
            }
            return;
        }

        let parseRemoteResponse = () => {
            return xhr.status ? JSON.parse(xhr.responseText) : {error:'Remote server unreachable'};
        }

        let form = document.getElementById('imageForm');
        var fd = new FormData(form);
        //fd.append("file", file);

        var xhr = new XMLHttpRequest();
        xhr.open("POST", `${SERVER_CONFIG.imagesHost}/api/${path}/upload/`);
        xhr.setRequestHeader('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3');

        xhr.onloadend = function() {
            const response = parseRemoteResponse();
            console.log(response);
            if (xhr.status >= 200 && xhr.status < 300) {
                //The upload response goes out
                if (callback) {
                    callback(response);
                }
            } else {
                if (fallback) {
                    fallback(response);
                }
            }
        }

        xhr.onerror = () => {
            const response = parseRemoteResponse();
            console.log(response);
            fallback(response);
        }

        xhr.send(fd);
    };

    const displayPreviewPhoto = (event) => {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);

        reader.onload = (res) => {
            const preview = document.getElementById('preview');
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

    /**** SUBMIT BUTTON ****/

    document.getElementById('btnSubmit').addEventListener('click', (event) => {
        upload(
            event.currentTarget.getAttribute('path'), 
            uploadSuccess, 
            uploadFail
        );
    });

    document.getElementById('input-thumb').onchange = displayPreviewPhoto;

})();
