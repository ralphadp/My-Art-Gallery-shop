const verifyWordPattern = (context, next) => {

    try {

        if (typeof context.words === 'undefined' || !context.words || context.words.length === 0) {
            context.words = false;
        } else {
            context.words = context.words.join('|');
        }

        next(null, context);

    } catch(error) {
        throw error;
    }
};

module.exports = verifyWordPattern;