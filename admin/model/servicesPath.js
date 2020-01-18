const servicesNames = {
    JWT: 'JWT',
    IMAGES: 'IMAGES',
    SCRIPTS: 'SCRIPTS',
    APP: 'APP'
};

/**
 * Get the environment variable
 */
const getVars = () => {

    let values = {};

    for (key in servicesNames) {
        const container = process.env[`${key}_SERVICE_HOST_CONTAINER`];
        const local = process.env[`${key}_SERVICE_HOST`];
        
        const variable = container || local;
        console.log(key, '=', variable);
        values[`${key.toLowerCase()}Host`] = variable;
    }

    return values;
};

module.exports = getVars();