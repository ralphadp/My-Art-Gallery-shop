(() => {

    const logoutDialog = new Frame('logout-dialog');

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

    /**
     * Activate the search area
     * @param {*} menuItem 
     * @param {*} target 
     */
    const toogleSearch = (menuItem, target) => {
        menuItem.addEventListener('click', () => {
            if (target.style.display === 'flex') {
                target.style.display = 'none';
            } else {
                target.style.display = 'flex';
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
        document.getElementsByClassName('item').item(1),
        document.getElementsByTagName('aside').item(0)  
    );
    
    toogleSearch(
        document.getElementsByClassName('item').item(3),
        document.getElementsByClassName('search-bar').item(0),
    );

    toogleSearch(
        document.getElementsByClassName('vertical-item').item(3),
        document.getElementsByClassName('search-bar').item(0),
    );

    document.getElementById('option-home').addEventListener('click', () => {
        window.location.replace(window.location.origin + '/');
    });

    document.getElementById('vertical-option-home').addEventListener('click', () => {
        window.location.replace(window.location.origin + '/');
    });

    document.getElementById('option-documents').addEventListener('click', () => {
        window.location.replace(window.location.origin + '/documents');
    });

    document.getElementById('vertical-option-documents').addEventListener('click', () => {
        window.location.replace(window.location.origin + '/documents');
    });

    document.getElementById('option-logout').addEventListener('click', () => {
        logoutDialog.show();
    });

    document.getElementById('option-profile').addEventListener('click', () => {
        window.location.replace(window.location.origin + '/profile');
    });

    document.getElementById('option-messages').addEventListener('click', () => {
        window.location.replace(window.location.origin + '/messages');
    });

    document.getElementById('option-configuration').addEventListener('click', () => {
        window.location.replace(window.location.origin + '/configuration');
    });

})();