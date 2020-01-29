/** CATEGORY BUTTONS **/

const deleteCategoryDialog = new Frame('delete-category-dialog');
const tableButtons = new TableButtons(deleteCategoryDialog, 'category_to_delete_id');
tableButtons.setRestPathCallback(dataCategory => {
    return `/categories/edit/${dataCategory.id}/${dataCategory.path}/${dataCategory.name}`;
});
tableButtons.attach('edition-options-data-category', 'category-delete-no');
