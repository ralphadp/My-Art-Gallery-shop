const fs = require('fs');

const MAX_THUMB_PER_PAGE = 21;
/**
 * Calculate next Thumbs per page
 * @param {*} pieces 
 * @param {*} index 
 */
let calculateThumbPerPage = (pieces, index) => {
    const MIN = (index - 1) * MAX_THUMB_PER_PAGE;
    const MAX = (pieces.length < MAX_THUMB_PER_PAGE) ? pieces.length : ((pieces.length < MIN + MAX_THUMB_PER_PAGE) ? pieces.length : MIN + MAX_THUMB_PER_PAGE);

    return {
        MIN,
        MAX
    };
}

/**
 * Get the number of pages to use
 * @param {*} totalSize 
 */
let numPages = (totalSize) => {

    let wholePart = Math.trunc(totalSize / MAX_THUMB_PER_PAGE);
    const decimalPart = Math.trunc(totalSize % MAX_THUMB_PER_PAGE);

    if (decimalPart > 0) {
        wholePart++;
    }

    return wholePart;
}

/**
 * Converts an array to an object selecting the key as mapped field
 * @param {*} array 
 * @param {*} key 
 */
const arrayToObject = (array, key) => {
    const mappedField = {};
    return array.reduce((object, item) => {
      return {
        ...object,
        [item[key]]: item,
      };
    }, mappedField);
};

/**
 * Calculate buttons to show
 * @param {*} buttonsSize 
 * @param {*} index 
 */
let calculatePagerButtons = (buttonsSize, index) => {

    let buttons = [];

    if (buttonsSize <= 7) {
        for (let index = 1; index <= buttonsSize; index++) {
            buttons.push(index);
        }

        return buttons;
    }

    //TODO: do it from DB or REDIS
    let groups = JSON.parse(fs.readFileSync('../tests/mockdata/buttons-group-mock.json'));
    let group1 = groups.group1;
    let group2 = groups.group2;

    if (index === 1)  {
        group1 = [1, 2, 3];
        buttons = [...group1, '...', ...group2];
    } else if (index === 2) {
        group1 = [1, 2, 3];
        buttons = [...group1, '...', ...group2];
    } else if (index >= 3 && index < group2[0] - 1) {
        group1 = ['<', index - 1, index, index + 1];
        buttons = [...group1, '...', ...group2];
    }

    if (index === buttonsSize)  {
        group2 = [index - 2, index - 1, index];
        buttons = [...group1, '...', ...group2];
    } else if (index === buttonsSize - 1) {
        group2 = [index - 1, index, index + 1];
        buttons = [...group1, '...', ...group2];
    } else if (index <= buttonsSize - 2 && index > group1[2] + 1) {
        group2 = [index - 1, index, index + 1, '>'];
        buttons = [...group1, '...', ...group2];
    }

    groups.group1 = group1;
    groups.group2 = group2;
    fs.writeFileSync('../tests/mockdata/buttons-group-mock.json', JSON.stringify(groups, null, 4));

    return buttons;
}

/**
 * Removes the - character of the category code with space
 * @param {*} path 
 */
const fromCategoryPathToCategoryName = (path) => {
    return path.replace(/-/g, " ");
};

/**
 * Split an array ig groups of size set by chunkSize
 * @param {*} array 
 * @param {*} chunkSize 
 */
const chunk = (array, chunkSize) => {
    if (!(array instanceof Array)) {
        return array;
    }

    var results = [];

    while (array.length) {
        results.push(
            array.splice(
                0, 
                chunkSize
            )
        );
    }
    
    return results;
};

/**
 * Get the current date only
 */
const TODAY = () => {
    var local = new Date();
    local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
};

/**
 * Parse the json response from paypal after the cart transaction
 * @param {*} userId 
 * @param {*} data 
 * 
 * sample data:
 * {
        payer_email: 'sb-me0fz818012@personal.example.com',
        payer_id: '5K9MQKFDS8KP2',
        payer_status: 'VERIFIED',
        first_name: 'Susan',
        last_name: 'Bithsmith',
        address_name: 'Susan Bithsmith',
        address_street: 'Free Trade Zone',
        address_city: 'Buenos Aires',
        address_state: 'Buenos Aires',
        address_country_code: 'AR',
        address_zip: 'B1675',
        residence_country: 'AR',
        txn_id: '5WN21147E47847143',//order id
        mc_currency: 'USD',
        mc_gross: '9.22',
        protection_eligibility: 'INELIGIBLE',
        payment_gross: '9.22',
        payment_status: 'Pending',
        pending_reason: 'unilateral',
        payment_type: 'instant',
        handling_amount: '0.00',
        shipping: '0.00',
        item_name1: 'Dalea neomexicana (A. Gray) Cory var. neomexicana',
        item_number1: 'f3e9cfa9-82e5-40d7-868a-58a30a6e78ac',
        quantity1: '1',
        mc_gross_1: '9.22',
        tax1: '0.00',
        num_cart_items: '1',
        txn_type: 'cart',
        payment_date: '2020-01-07T01:05:44Z',
        notify_version: 'UNVERSIONED',
        verify_sign: 'AMfhQUcOeRKOxZX.4q9FzrZXYdoOAAHk7-RdhjeWVJj.MVnNzK.b9VTE'
    };
 */
const parsePaypalCartReturnData = (userId, data) => {

    /**
     * Just to have an order of what we need
     * 
     * @param {*} orderId 
     * @param {*} pieceId 
     * @param {*} pieceDescription 
     * @param {*} userId 
     * @param {*} payTime 
     * @param {*} payerId 
     * @param {*} payerName 
     * @param {*} raw 
     * @param {*} amount 
     * @param {*} currency 
     */
    const setOrder = (
            orderId, 
            pieceId, 
            pieceDescription,
            userId, 
            payTime, 
            payerId, 
            payerName, 
            raw, 
            amount, 
            currency
        ) => {
        return [
            orderId,
            pieceId,
            pieceDescription,
            userId,
            payTime,
            payerId,
            payerName,
            raw,
            amount,
            currency
        ];
    };

    let index = 0;
    let order = [];

    while (index < Number(data.num_cart_items)) {
        index++;
        order.push(setOrder(
            data.txn_id,
            data['item_number' + index],
            data['item_name' + index],
            userId,
            data.payment_date,
            data.payer_id,
            data.first_name + ' ' + data.last_name,
            JSON.stringify(data),
            data['mc_gross_' + index],
            data.mc_currency
        ));
    }

    order.push(setOrder(
        data.txn_id,
        'Total',
        'total',
        userId,
        data.payment_date,
        data.payer_id,
        data.first_name + ' ' + data.last_name,
        JSON.stringify(data),
        data.mc_gross,
        data.mc_currency
    ));

    return order;
}

module.exports = {
    MAX_THUMB_PER_PAGE,
    calculateThumbPerPage,
    numPages,
    arrayToObject,
    calculatePagerButtons,
    fromCategoryPathToCategoryName,
    chunk,
    TODAY,
    parsePaypalCartReturnData
};