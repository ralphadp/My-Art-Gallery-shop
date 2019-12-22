const {config} = require('galleryRepository');

class ConfigHandler {
    constructor() {
    }

    /**
     * Get the value
     * @param {*} key 
     */
    static async fetchValue(key) {
        let value = false;

        try {
            const result = await config.getById(key);
            value = result[0].value;
            if (!NaN(value)) {
                value = Number(value);
            }
        } catch(error) {
            console.log(error);
        }

        return value;
    }
}

module.exports = ConfigHandler;