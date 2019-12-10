let request = config => {
    return new Promise((resolve, reject) => {

        let xhr = new XMLHttpRequest();

        xhr.open(config.method || "GET", config.url);

        if (config.headers) {
            //for JWT
            Object.keys(config.headers).forEach(key => {
                xhr.setRequestHeader(key, config.headers[key]);
            });
        }

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response);
            } else {
                reject(xhr.statusText);
            }
        };

        xhr.onerror = () => reject(xhr.statusText);

        xhr.send(config.body);
    });
};