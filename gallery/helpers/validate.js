const {body, validationResult} = require('express-validator/check');
const {users} = require('galleryRepository');

/**
 * Validate account input
 * @param {*} method 
 */
const validate = (method) => {
    try {
        switch (method) {
            case 'newAccount': {
                return [ 
                    body('first_name', "First name doesn't exists").exists(),
                    body('last_name', "Last name doesn't exists").exists(),
                    body('email', 'Invalid email').exists().isEmail().custom(value => {
                        const user = new users();
                        return user.getByEmail(value).then(result => {
                             if (result.length) {
                                return Promise.reject('E-mail already in use');
                            }
                        });
                    }),
                    body('password', 'Password must be at least 8 chars long').isLength({ min: 8 }),
                    body('birth', "Birth doesn't exists").exists(),
                    body('movile').optional().isMobilePhone(),
                    body('gender').optional().isIn(['1', '0']),
                    body('country', "Country doesn't exists").exists(),
                    body('city', "City doesn't exists").exists(),
                    body('postal_code', "Postal code is incorrect").exists().isAlphanumeric(),
                    body('accept_legal', "Accept legal rules is not checked").exists(),
                ]
            }
        }
    } catch(error) {
        console.log(error);
    }
};

/**
 * Return formatted errors 
 * @param {*} request 
 */
const validateResult = (request) => {

    const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
        return `${param} '${value}': ${msg}`;
    };

    return validationResult(request).formatWith(errorFormatter);
}

module.exports.validate = validate;
module.exports.validateResult = validateResult;