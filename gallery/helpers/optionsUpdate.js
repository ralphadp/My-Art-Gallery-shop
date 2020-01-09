const {config} = require('galleryRepository');

/**
 * Get the app config options
 */
const optionsUpdate = async function() {

    try {
        const conf = new config();
        const options = await conf.getGalleryOptions();
        let objectOptions = {};
        options.forEach(option => {
            objectOptions[option.name] = option.value;
        });
        global.options = objectOptions;
        console.log('Configuration:', global.options);
    } catch(error) {
        console.log(error);
        return false;
    }

    return true;
}

module.exports = optionsUpdate;