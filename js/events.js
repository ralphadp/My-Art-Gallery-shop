(() => 
{
    document.getElementById('input-search-art').addEventListener('keypress', (event) => {
        if (event.keyCode === 13) {
            alert('SEARCHING ...');
        }
    });

    /***********************************************************************/

    const stopTouchMoveEvent = (event) => {
        event.preventDefault();
        event.returnValue = false;
    };

    const enableScrolling = () => {
        document.body.style.height = null;
        document.body.style.overflow = null;
        document.body.removeEventListener('touchmove', stopTouchMoveEvent);
    }

    const disableScrolling = () => {
        document.body.style.height = "100%";
        document.body.style.overflow = "hidden";
        document.body.addEventListener('touchmove', stopTouchMoveEvent);
    }

    const showPiece = (IDframe) => {
        document.getElementById(IDframe).style.display = "block";
    }

    const hidePiece = (IDframe) => {
        document.getElementById(IDframe).style.display = "none";
    }

    const openFrameEvent = () => {
        showPiece("piece");
        disableScrolling();
    };

    const closeFrameEvent = () => {
        hidePiece("piece");
        enableScrolling();
    };

    const openPhotoEvent = (event) => {
        ///temporary line
        document.getElementById("photo-image").src = event.srcElement.currentSrc;

        /****************/ 
        showPiece("piece-maximized");
        disableScrolling();
    };

    const closePhotoEvent = () => {
        hidePiece("piece-maximized");
        enableScrolling();
    };

    const openListEvent = (event) => {
        showPiece("list");
        disableScrolling();
    };

    const closeListEvent = () => {
        hidePiece("list");
        enableScrolling();
    };

    const openPickingEvent = (event) => {
        showPiece("cart-picking");
        disableScrolling();
    };

    const closePickingEvent = () => {
        hidePiece("cart-picking");
        enableScrolling();
    };

    const stopEventsChain = (event) => {
        event.stopPropagation();
    }

    /***********************************************************************************************/

    /*INFORMATION PIECE */

    const infoButton = document.getElementsByClassName("piece-info-button");
    for (let index = 0; index < infoButton.length; index++) {
        infoButton.item(index).addEventListener('click', openFrameEvent);    
    }

    document.getElementById("piece").addEventListener('click', closeFrameEvent);//fog

    document.getElementById("box-close").addEventListener('click', closeFrameEvent);//close-button

    document.getElementById("info-frame").addEventListener('click', stopEventsChain);

    /*PHOTO PIECE */

    const thumbList = document.getElementsByClassName("thumb-pic");
    for (let index = 0; index < thumbList.length; index++) {
        thumbList.item(index).addEventListener('click', openPhotoEvent);    
    }

    document.getElementById("piece-maximized").addEventListener('click', closePhotoEvent);//fog
    
    document.getElementById("photo").addEventListener('click', stopEventsChain);

    /*LIST PIECE */

    document.getElementById("open-list").addEventListener('click', openListEvent);

    document.getElementById("open-list-footer").addEventListener('click', openListEvent);

    document.getElementById("list").addEventListener('click', closeListEvent);//fog

    document.getElementById("list-box-close").addEventListener('click', closeListEvent);//close-button
    
    document.getElementById("list-frame").addEventListener('click', stopEventsChain);

    /*PICkED PIECES */

    document.getElementById("open-picked").addEventListener('click', openPickingEvent);

    document.getElementById("open-picked-footer").addEventListener('click', openPickingEvent);

    document.getElementById("cart-picking").addEventListener('click', closePickingEvent);//fog

    document.getElementById("pick-box-close").addEventListener('click', closePickingEvent);//close-button
    
    document.getElementById("pick-frame").addEventListener('click', stopEventsChain);


})();