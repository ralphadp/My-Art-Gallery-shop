const {config} = require('gallery-repository');

/**
 * Get the app config options
 */
const optionsUpdate = async function() {

    try {
        const conf = new config();
        const options = await conf.getGalleryOptions();
        let objectOptions = {};
        options.forEach(option => {
            objectOptions[option.name] = (option.type === 'checkbox') ? Number(option.value) : option.value;
        });
        global.options = objectOptions;
        console.log('Global Configuration: ', global.options);
    } catch(error) {
        console.log(error);
        return false;
    }

    return true;
}

module.exports = optionsUpdate;