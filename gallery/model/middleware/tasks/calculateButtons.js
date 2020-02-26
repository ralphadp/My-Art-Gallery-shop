const {calculateThumbPerPage, calculatePagerButtons} = require("./util/utilities");

const calculateButtons = (context, next) => {

    try {
        let {MIN, MAX} = calculateThumbPerPage(context.piecePhoto, context.index);
        let buttons = calculatePagerButtons(context.NUM_PAGES, context.index);

        context.page_min = MIN;
        context.page_max = MAX;
        context.buttons = buttons;

        next(null, context.buttons);
        
    } catch(error) {
        throw error;
    }
};

module.exports = calculateButtons;