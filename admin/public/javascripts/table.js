const deleteCategoryDialog = new Frame('delete-category-dialog');

let tableCells = document.getElementsByClassName('edition-options-data');

for (let index = 0; index < tableCells.length ; index++) {
    var button = document.createElement("button");
    button.innerHTML = '+';
    button.style.background = '#61d89d';
    button.style.borderRadius = '5px';
    button.style.color = 'white';
    button.style.boxShadow = 'inset 0px 1px 1px #909193, 0px 1px 0px #fff';
    button.style.width = '1.5em';
    button.style.height = '1.5em';
    button.style.cursor = 'pointer';
    button.addEventListener('click', () => {

        let dataCategory = JSON.parse(tableCells.item(index).getAttribute('data'));
        window.location.replace(window.location.origin + `/categories/edit/${dataCategory.id}/${dataCategory.path}/${dataCategory.name}`);

    });
    tableCells.item(index).appendChild(button);

    button = document.createElement("button");
    button.innerHTML = '-';
    button.style.background = '#e73f5b';
    button.style.borderRadius = '5px';
    button.style.color = 'white';
    button.style.boxShadow = 'inset 0px 1px 1px #909193, 0px 1px 0px #fff';
    button.style.width = '1.5em';
    button.style.height = '1.5em';
    button.style.cursor = 'pointer';
    button.addEventListener('click', () => {

        let dataCategory = JSON.parse(tableCells.item(index).getAttribute('data'));
        document.getElementById('category_to_delete_id').value = dataCategory.id;

        deleteCategoryDialog.show();

    });
    tableCells.item(index).appendChild(button);
}

document.getElementById('category-delete-no').addEventListener('click', (event) => {
    deleteCategoryDialog.close();
    /*to avoid follow the action form route*/
    event.preventDefault();
});
