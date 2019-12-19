(() => {

    /**
     * Toogle aside menu 
     * @param {*} menuItem 
     * @param {*} affectedMenuItem 
     * @param {*} target 
     */
    const toogleMenu = (menuItem, affectedMenuItem, target) => {
        menuItem.addEventListener('click', () => {
            const EMPTY = '';
            const DOT = ' •';
            let status = window.getComputedStyle(menuItem, ':after').getPropertyValue('content');
           
            status = status.replace(/"/g, EMPTY);
            if (status.length) {
                menuItem.setAttribute('status', EMPTY);
                affectedMenuItem.setAttribute('status', EMPTY);
                target.style.display = 'none';
            } else {
                menuItem.setAttribute('status', DOT);
                affectedMenuItem.setAttribute('status', DOT);
                target.style.display = 'block';
            }
        });
    };

    toogleMenu(
        document.getElementsByClassName('item').item(1),
        document.getElementsByClassName('vertical-item').item(1),
        document.getElementsByTagName('aside').item(0)
    );

    toogleMenu(
        document.getElementsByClassName('vertical-item').item(1),
        document.getElementsByClassName('vertical-item').item(1),
        document.getElementsByTagName('aside').item(0)  
    );
    

})();