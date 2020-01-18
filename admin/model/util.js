const {categories, util} = require('gallery-repository');

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

    /**
     * Get the value
     * 
     * @param {*} key 
     * @param {*} resolve 
     * @param {*} reject 
     */
    static getValueOfStorage(key, resolve, reject) {
        const oUtil = new util();
        oUtil.getValue(key)
        .then((row) => {
            if (row.length) {
                resolve(row[0].value);
            } else {
                resolve('empty');
            }
        })
        .catch((error) => {
            console.log(error);
            reject(new Error(error));
        });
    }

    /**
     * 
     * @param {*} key 
     * @param {*} value 
     * @param {*} resolve 
     * @param {*} reject 
     */
    static setKeyValueInStorage(key, value, resolve, reject) {
        const oUtil = new util();
        oUtil.save(key, value)
        .then((result) => {
            resolve(`Pair (${key}, ${value}) saved.`);
        })
        .catch((error) => {
            console.log(error);
            reject(new Error(error));
        });
    }

    /**
     * 
     * @param {*} key 
     * @param {*} value 
     * @param {*} resolve 
     * @param {*} reject 
     */
    static changeValueInStorage(key, value, resolve, reject) {
        const oUtil = new util();
        oUtil.update(key, value)
        .then((result) => {
            resolve(`Pair (${key}, ${value}) updated.`);
        })
        .catch((error) => {
            console.log(error);
            reject(new Error(error));
        });
    }

    /**
     * Get current formated date
     */
    static getCurrentDate() {
        const today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        let yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }

        return {
            fullText: (dd + '/' + mm + '/' + yyyy),
            halfText: (mm + '/' + yyyy),
            month: Number(mm),
            day: Number(dd),
            year: yyyy
        }
    }

    /**
     * Convert the camel case to a simple string separated by spaces
     * @param {*} camel 
     */
    static camelCaseToPhrase(camel) {
        if (typeof camel !== 'string') {
            return '';
        }

        let phase = camel.replace(/([a-z])([A-Z])/g, '$1 $2');

        return phase.charAt(0).toUpperCase() + phase.slice(1);
    }

}

module.exports = Util;