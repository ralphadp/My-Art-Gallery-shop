let request = config => {

    /**
     * Set message in case to get undeterminated wrong response from server
     * @param {*} paramMessage
     */
    function badResponse(paramMessage) {
        return JSON.stringify({
            result: false,
            success: false,
            message: paramMessage
        });
    }

    return new Promise((resolve, reject) => {

        let xhr = new XMLHttpRequest();

        xhr.open(config.method || "GET", config.url);

        let parseRemoteResponse = () => {
            let response = null;

            if (xhr.status) {
                response = xhr.responseText ? xhr.responseText : xhr.response;
                response = response ? response : badResponse(xhr.statusText);
            } else {
                response = badResponse('Remote server unreachable');
            }

            if (config.result === 'object') {
                response = JSON.parse(response);
            }

            console.log(response);

            return response;
        };

        if (config.headers) {
            //for application/x-www-form-urlencoded, multipart/form-data, json, JWT
            Object.keys(config.headers).forEach(key => {
                xhr.setRequestHeader(key, config.headers[key]);
            });
        }

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(parseRemoteResponse());
            } else {
                reject(parseRemoteResponse());
            }
        };

        xhr.onerror = () => {
            reject(parseRemoteResponse());
        }

        xhr.send(config.body);
    });
};