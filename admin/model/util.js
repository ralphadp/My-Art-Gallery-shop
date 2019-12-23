
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
}

module.exports = Util;