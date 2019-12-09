(() => 
{
    document.getElementById('input-search-art').addEventListener('keypress', (event) => {
        if (event.keyCode === 13) {
            alert('SEARCHING ...');
        }
    });

    /***********************************************************************/

    const pieceFrame = new Frame('piece-form');
    const piecePhoto = new Photo('piece-maximized');
    const availableFrame = new Frame('list');
    const pickedFrame = new Frame('cart-picking');

    /***********************************************************************************************/

    /*INFORMATION PIECE */

    const infoButton = document.getElementsByClassName("piece-info-button");
    for (let index = 0; index < infoButton.length; index++) {
        infoButton.item(index).addEventListener('click', () => {
            //TODO: have a map of the pieces according the ID
            const ID = event.currentTarget.getAttribute("reference") - 1;
            
            document.getElementById("pieceName").innerHTML = allpieces[ID].name;
            document.getElementById("pieceArtist").innerHTML = allpieces[ID].artist;
            document.getElementById("pieceType").innerHTML = allpieces[ID].type;
            document.getElementById("pieceDate").innerHTML = allpieces[ID].date;
            document.getElementById("pieceSize").innerHTML = allpieces[ID].size;
            document.getElementById("piecePrice").innerHTML = allpieces[ID].price;
            pieceFrame.show()
        });
    }

    /*PHOTO PIECE */

    const thumbList = document.getElementsByClassName("thumb-pic");
    for (let index = 0; index < thumbList.length; index++) {
        thumbList.item(index).addEventListener('click', (event) => piecePhoto.show(event));
    }

    /*LIST PIECE */

    document.getElementById("open-list").addEventListener('click', () => availableFrame.show());
    document.getElementById("open-list-footer").addEventListener('click', () => availableFrame.show());
 
    /*PICkED PIECES */

    document.getElementById("open-picked").addEventListener('click', () => pickedFrame.show());
    document.getElementById("open-picked-footer").addEventListener('click', () => pickedFrame.show());

})();