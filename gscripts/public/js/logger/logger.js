/**
 * Curred function to log any message
 * 
 * @param {*} type 
 */
function log(type) {
    return function (message) {
        const datetime 
            = new Date(
                new Date().toString().split('GMT')[0] + ' UTC'
                ).toISOString().split('.')[0];
        console.log(`${datetime} [${type}]: ${message}`);
    }
}

const DEBUG = log('DEBUG');
const INFO = log('INFO');
const ERROR = log('ERROR');