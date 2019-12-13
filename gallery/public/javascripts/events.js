(() => 
{
    document.getElementById('input-search-art').addEventListener('keypress', (event) => {
        if (event.keyCode === 13) {
            const words = document.getElementById('input-search-art').value.replace(/ /g, "+");
            window.location.replace(window.location.origin + '/search/' + words);
        }
    });

    /***********************************************************************/

    const pieceFrame = new Frame('piece-form');
    const piecePhoto = new Photo('piece-maximized');
    const availableFrame = new Frame('list');
    const pickedFrame = new Frame('cart-picking');

    /***********************************************************************************************/

    /*INFORMATION PIECE */

    getPickedType = (picked) => {
        if (picked === 'PRIVATE') {
            return 'Not Available';
        } else {
            if (picked) {
                return 'In cart';
            }
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
            document.getElementById("pieceDate").innerHTML   = allpieces[ID].date;
            document.getElementById("pieceSize").innerHTML   = allpieces[ID].size;
            document.getElementById("piecePrice").innerHTML  = allpieces[ID].price;
            document.getElementById("piecePicked").innerHTML = getPickedType(allpieces[ID].picked);

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

    /*CHOOSE A PIECE AND PUT INTO YOUR CART */

    const thumbCheckbox = document.getElementsByClassName("thumb-checkbox");
    for (let index = 0; index < thumbCheckbox.length; index++) {
        thumbCheckbox.item(index).addEventListener('click', (event) => {
            var checkbox = event.target;
            if (checkbox.checked) {
                request({url: "cart/add-to/" + checkbox.id})
                .then(data => {
                    let response = JSON.parse(data);
                    alert (response.message);
                })
                .catch(error => {
                    console.log(error);
                });
            } else {
                request({url: "cart/remove-from/" + checkbox.id})
                .then(data => {
                    let response = JSON.parse(data);
                    alert (response.message);
                })
                .catch(error => {
                    console.log(error);
                });
            }
        }, false);
    }


})();