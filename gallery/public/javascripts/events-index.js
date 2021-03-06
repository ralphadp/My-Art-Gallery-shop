(() => 
{
    /***********************************************************************************************/

    const pieceFrame = new Frame('piece-form');
    const piecePhoto = new Photo('piece-maximized');

    /***********************************************************************************************/

    /*INFORMATION PIECE */

    /**
     * Get the state of the piece for sale
     * @param {*} item 
     */
    let getPickedType = (item) => {
        if (item.bought) {
            return 'BOUGHT';
        } else if (item.picked === 'PRIVATE') {
            return 'Not Available';
        } else if (item.picked) {
            return 'In cart';
        }

        return 'Available';
    }

    const infoButton = document.getElementsByClassName("piece-info-button");
    for (let index = 0; index < infoButton.length; index++) {
        infoButton.item(index).addEventListener('click', (event) => {
            //TODO: have a map of the pieces according the ID
            const ID = event.currentTarget.getAttribute("reference");

            document.getElementById("pieceName").innerHTML   = allpieces[ID].name;
            document.getElementById("pieceArtist").innerHTML = allpieces[ID].artist;
            document.getElementById("pieceType").innerHTML   = allpieces[ID].type;
            document.getElementById("pieceDate").innerHTML   = allpieces[ID].release_date;
            document.getElementById("pieceSize").innerHTML   = allpieces[ID].size;
            document.getElementById("piecePrice").innerHTML  = allpieces[ID].price + ' ' + allpieces[ID].currency;
            document.getElementById("piecePicked").innerHTML = getPickedType(allpieces[ID]);

            if (typeof setPaypalPurchase !== 'undefined' && !allpieces[ID].bought) {
                setPaypalPurchase(allpieces[ID]);
            }

            pieceFrame.show()
        });
    }

    /*PHOTO PIECE */

    const thumbList = document.getElementsByClassName("thumb-pic");
    for (let index = 0; index < thumbList.length; index++) {
        thumbList.item(index).addEventListener('click', (event) => piecePhoto.show(event));
    }

})();