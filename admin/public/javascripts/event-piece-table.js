/** PIECE BUTTONS **/

const deletePieceDialog = new Frame('delete-piece-dialog');
const tableButtons = new TableButtons(deletePieceDialog, 'piece_to_delete_id');
tableButtons.setRestPathCallback(dataPiece => {
    return `/pieces/edit/${dataPiece.id}`;
});
tableButtons.attach('edition-options-data-piece', 'piece-delete-no');