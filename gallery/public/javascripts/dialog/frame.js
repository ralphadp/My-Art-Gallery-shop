function Frame (
    frameElementId,
    hasClosebutton = true)
{
    Foggy.call(
        this, 
        frameElementId,
        hasClosebutton
    );
    
    if (!this.internalFrame.classList.contains('frame')) {
        this.internalFrame.classList.add('frame');
    }
};

//Extends from Foggy
Frame.prototype = Object.create(Foggy.prototype);