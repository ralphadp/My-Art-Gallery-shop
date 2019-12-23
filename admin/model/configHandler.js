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
            const oConfig = new config();
            const result = await oConfig.getById(key);
            value = result[0].value;
            if (!isNaN(value)) {
                //only if is a number 
                value = Number(value);
            }
        } catch(error) {
            console.log(error);
        }

        return value;
    }
}

module.exports = ConfigHandler;