const {categories} = require('galleryRepository');

const getCategories = (context, next) => {
    const oCategory = new categories();
    oCategory.getAll()
    .then(categoriesResult => {

        context.categories = categoriesResult;

        next(null, context.categories);
    })
    .catch(error => {
        throw error;
    });;
};

module.exports = getCategories;