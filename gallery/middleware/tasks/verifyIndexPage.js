const verifyIndexPage = (context, next) => {

    try {
        context.index = Number(context.index);

        if (isNaN(context.index)) {
            message = `Invalid page index, not [${context.index}]`;
            console.log(message);
            throw message;
        }

        next(null, context);

    } catch(error) {
        throw error;
    }
};

module.exports = verifyIndexPage;