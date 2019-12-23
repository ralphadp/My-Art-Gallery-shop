/**
 * Attach buttons into table
 * 
 * @param {*} BUTTONS_CELL 
 * @param {*} clickEdit 
 * @param {*} clickDelete 
 * @param {*} STOP_BUTTON_ID 
 * @param {*} clickStopDelete 
 */
const attachTableButtons = (BUTTONS_CELL, clickEdit, clickDelete, STOP_BUTTON_ID, clickStopDelete) => {
    let tableCells = document.getElementsByClassName(BUTTONS_CELL);
    for (let index = 0; index < tableCells.length; index++) {
        var button = document.createElement("button");
        button.innerHTML = '+';
        button.style.background = '#61d89d';
        button.style.borderRadius = '5px';
        button.style.color = 'white';
        button.style.boxShadow = 'inset 0px 1px 1px #909193, 0px 1px 0px #fff';
        button.style.width = '1.5em';
        button.style.height = '1.5em';
        button.style.cursor = 'pointer';
        button.data = JSON.parse(tableCells.item(index).getAttribute('data'));
        button.addEventListener('click', clickEdit);
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
        button.data = JSON.parse(tableCells.item(index).getAttribute('data'));
        button.addEventListener('click', clickDelete);
        tableCells.item(index).appendChild(button);
    }

    document.getElementById(STOP_BUTTON_ID).addEventListener('click', clickStopDelete);
};

/** CATEGORY BUTTONS **/

const deleteCategoryDialog = new Frame('delete-category-dialog');

const clickEditCategory = (event) => {
    let dataCategory = event.currentTarget.data;
    window.location.replace(
        window.location.origin + `/categories/edit/${dataCategory.id}/${dataCategory.path}/${dataCategory.name}`
    );
};

const clickDeleteCategory = (event) => {
    let dataCategory = event.currentTarget.data;
    document.getElementById('category_to_delete_id').value = dataCategory.id;
    deleteCategoryDialog.show();
};

attachTableButtons('edition-options-data-category', clickEditCategory, clickDeleteCategory, 'category-delete-no', (event) => {
    deleteCategoryDialog.close();
    /*to avoid follow the action form route*/
    event.preventDefault();
});

/** USER BUTTONS **/

const deleteUserDialog = new Frame('delete-user-dialog');

const clickEditUser = (event) => {
    let dataUser = event.currentTarget.data;
    window.location.replace(
        window.location.origin + `/users/edit/${dataUser.id}`
    );
};

const clickDeleteUser = (event) => {
    let dataUser = event.currentTarget.data;
    document.getElementById('user_to_delete_id').value = dataUser.id;
    deleteUserDialog.show();
};

attachTableButtons('edition-options-data-user', clickEditUser, clickDeleteUser, 'user-delete-no',  (event) => {
    deleteUserDialog.close();
    /*to avoid follow the action form route*/
    event.preventDefault();
});

/** ADMIN BUTTONS **/

const deleteAdminDialog = new Frame('delete-admin-dialog');

const clickEditAdmin = (event) => {
    let dataAdmin = event.currentTarget.data;
    window.location.replace(
        window.location.origin + `/users/admin/edit/${dataAdmin.id}`
    );
};

const clickDeleteAdmin = (event) => {
    let dataAdmin = event.currentTarget.data;
    document.getElementById('admin_to_delete_id').value = dataAdmin.id;
    deleteAdminDialog.show();
};

attachTableButtons('edition-options-data-admin', clickEditAdmin, clickDeleteAdmin, 'admin-delete-no',  (event) => {
    deleteAdminDialog.close();
    /*to avoid follow the action form route*/
    event.preventDefault();
});

/** PIECE BUTTONS **/

const deletePieceDialog = new Frame('delete-piece-dialog');

const clickEditPiece = (event) => {
    let dataPiece = event.currentTarget.data;
    window.location.replace(
        window.location.origin + `/pieces/edit/${dataPiece.id}`
    );
};

const clickDeletePiece = (event) => {
    let dataPiece = event.currentTarget.data;
    document.getElementById('piece_to_delete_id').value = dataPiece.id;
    deletePieceDialog.show();
};

attachTableButtons('edition-options-data-piece', clickEditPiece, clickDeletePiece, 'piece-delete-no',  (event) => {
    deletePieceDialog.close();
    /*to avoid follow the action form route*/
    event.preventDefault();
});
