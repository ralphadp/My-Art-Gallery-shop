const fromCategoryPathToCategoryName = (path) => {
    const words = path.split('-');

    words.map((item) => {
        return item.toUpperCase();
    });

    return words.join(' ');
};

module.exports = {
    fromPathToName: fromCategoryPathToCategoryName
};