const categoryRepo = require('../../repository/repo-categories');

const getCategories = (context, next) => {
    const oCategory = new categoryRepo();
    oCategory.getAll()
    .then(categories => {

        context.categories = categories;

        next(null, context.categories);
    })
    .catch(error => {
        throw error;
    });;
};

module.exports = getCategories;