/** ADMIN BUTTONS **/

const deleteAdminDialog = new Frame('delete-admin-dialog');
const tableButtons = new TableButtons(deleteAdminDialog, 'admin_to_delete_id');
tableButtons.setRestPathCallback(dataUser => {
    return `/users/admin/edit/${dataUser.id}`;
});
tableButtons.attach('edition-options-data-admin', 'admin-delete-no');