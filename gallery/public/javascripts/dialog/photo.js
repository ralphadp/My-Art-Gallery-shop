function Photo (
    frameElementId,
    hasClosebutton)
{
    Foggy.call(
        this, 
        frameElementId,
        hasClosebutton
    );

    if (!this.internalFrame.classList.contains('photo')) {
        this.internalFrame.classList.add('photo');
    }
};

//Extends from Foggy
Photo.prototype = Object.create(Foggy.prototype);

//Override beforeShow
Photo.prototype.beforeShow = function(event) {
    ///temporary line
    document.getElementById("photo-image").src = event.srcElement.currentSrc;
};
