function Foggy (
    frameElementId,
    hasClosebutton
)
{
    const FOG_ELEMENT_CLASS = 'fog-frame-x';

    this.frame = document.getElementById(frameElementId);

    if (!this.frame) {
        console.log(`The current element "${frameElementId}" does exists.`);
        return;
    }
    
    if (!this.frame.classList.contains(FOG_ELEMENT_CLASS)) {
        console.log(`The current element does not define "${FOG_ELEMENT_CLASS}" class as its own.`);
        return;
    }

    this.internalFrame = this.frame.firstElementChild;

    if (this.internalFrame.tagName.toLowerCase() !== "section") {
        console.log('The internal element does is not a "section".');
        return;
    }

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
        document.body.style.height = '100%';
        document.body.style.overflow = 'hidden';
        document.body.addEventListener('touchmove', stopTouchMoveEvent);
    }

    const showPiece = () => {
        this.frame.style.display = 'block';
    }

    const hidePiece = () => {
        this.frame.style.display = 'none';
    }

    /*not right, need a change to Module*/
    this.openEvent = (event) => {
        this.onOpen(event);
        this.beforeShow(event);
        showPiece();
        disableScrolling();
    };

    /*not right, need a change to Module*/
    this.closeEvent = (event) => {
        this.beforeClose(event);
        hidePiece();
        enableScrolling();
        this.onClose(event);
    };

    const stopEventsChain = (event) => {
        event.stopPropagation();
    };

    this.frame.addEventListener('click', this.closeEvent);
    this.internalFrame.addEventListener('click', stopEventsChain);

    if (hasClosebutton) {
        const classAnchor = 'box-close-x';
        const classSvg = 'icon-close-x';
        const useSvgReference = '#icon-box-close';

        const anchor = document.createElement('a');
        anchor.classList.add(classAnchor);
        anchor.addEventListener('click', this.closeEvent);
        this.internalFrame.insertBefore(anchor, this.internalFrame.firstChild);

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.classList.add(classSvg);
        svg.setAttribute('width', '20px');
        svg.setAttribute('height', '20px');
        anchor.appendChild(svg);
        
        const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', useSvgReference);
        svg.appendChild(use);
    }
};

Foggy.prototype.beforeShow = function(event) {
};

Foggy.prototype.beforeClose = function(event) {
};

Foggy.prototype.show = function(event) {
    if (typeof this.openEvent !== 'function') {
        console.log('Error: Cannot show frame, "openEvent" is not defined.');
        return;
    }
    this.openEvent(event);
};

Foggy.prototype.close = function(event) {
    if (typeof this.closeEvent !== 'function') {
        console.log('Error: Cannot show frame, "closeEvent" is not defined.');
        return;
    }
    this.closeEvent(event);
};

Foggy.prototype.onOpen = function(event) {
};

Foggy.prototype.onClose = function(event) {
};