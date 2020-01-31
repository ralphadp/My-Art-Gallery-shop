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

    document.getElementById('logout-yes').addEventListener('click', () => {
        window.location.replace(window.location.origin + '/logout');
    });

    document.getElementById('logout-no').addEventListener('click', () => {
        logoutDialog.close();
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