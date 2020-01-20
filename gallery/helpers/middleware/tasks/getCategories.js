const {categories} = require('gallery-repository');
const {chunk} = require("./util/utilities");

const getCategories = (context, next) => {
    const oCategory = new categories();
    oCategory.getAll()
    .then(categoriesResult => {

        context.categories = chunk(categoriesResult, 7);

        next(null, context.categories);
    })
    .catch(error => {
        throw error;
    });;
};

module.exports = getCategories;