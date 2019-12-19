(() => {

    let toogleMenu = (menuItem) => {
        menuItem.addEventListener('click', () => {
            let status = window.getComputedStyle(menuItem, ':after').getPropertyValue('content');
    
            status = status.replace(/"/g, '');
            if (status.length) {
                menuItem.setAttribute('status', '');
            } else {
                menuItem.setAttribute('status', ' •');
            }
        });
    };

    toogleMenu(document.getElementsByClassName('item').item(1));
    toogleMenu(document.getElementsByClassName('vertical-item').item(1));
    

})();