const servicesNames = {
    JWT: 'JWT',
    IMAGES: 'IMAGES',
    SCRIPTS: 'SCRIPTS',
    APP: 'APP'
};

/**
 * Get the environment variables values
 */
const getVars = () => {

    let values = {};

    for (key in servicesNames) {
        let container = process.env[`${key}_SERVICE_HOST_CONTAINER`];
        let local = process.env[`${key}_SERVICE_HOST`];
        const hostname = container || local;

        container = process.env[`${key}_SERVICE_PORT_CONTAINER`];
        local = process.env[`${key}_SERVICE_PORT`];
        const port = container || local;

        console.log(`Service: ${key} hostname=${hostname} port=${port}`);

        const host = `http://${hostname}:${port}`;

        values[`${key.toLowerCase()}Host`] = host;
    }

    return values;
};

module.exports = getVars();