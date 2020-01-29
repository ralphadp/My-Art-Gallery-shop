/** USER BUTTONS **/

const deleteUserDialog = new Frame('delete-user-dialog');
const tableButtons = new TableButtons(deleteUserDialog, 'user_to_delete_id');
tableButtons.setRestPathCallback(dataUser => {
    return `/users/edit/${dataUser.id}`;
});
tableButtons.attach('edition-options-data-user', 'user-delete-no');