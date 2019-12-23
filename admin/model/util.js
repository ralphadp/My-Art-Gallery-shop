const {categories} = require('galleryRepository');

class Util {
    constructor() {
    }

    /**
     * Get the value
     * @param {*} key 
     */
    static getDateFromDatetime(datetime) {
        if (!datetime) {

            return null;
        }
        const splitDate = datetime.split('T');

        if (splitDate && splitDate.length) {
            return splitDate[0];    
        }

        return datetime;
    }

    /**
     * Get all the categories
     */
    static async getAllArtCategories() {
        let results = [];

        try {
            const category = new categories();
            results = await category.getAll();
            results.map(element => {
                element.path = element.path.toUpperCase();
                console.log(element.path);
                return element;
            });
        } catch(error) {
            console.log(error);
        }

        return results;
    }
}

module.exports = Util;