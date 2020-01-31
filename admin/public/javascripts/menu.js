class Menu {
    constructor(logoutDialog, NORMAL_MENU_ITEM_SWITCH, MOBILE_MENU_ITEM_SWITCH, VERTICAL_MENU) {
        this.logoutDialog = logoutDialog;
        this.VERTICAL_MENU = VERTICAL_MENU;
        this.NORMAL_MENU_ITEM_SWITCH = NORMAL_MENU_ITEM_SWITCH;
        this.MOBILE_MENU_ITEM_SWITCH = MOBILE_MENU_ITEM_SWITCH;
    }

    toogleVerticalMenuWithNormalMenu(event) {
        this.toogleVerticalAsideMenu(event, this.MOBILE_MENU_ITEM_SWITCH);
    }

    toogleVerticalMenuWithMobileMenu(event) {
        this.toogleVerticalAsideMenu(event, this.NORMAL_MENU_ITEM_SWITCH);
    }

    /**
     * Toogle Left Vertical Aside menu 
     * @param {*} menuItem 
     * @param {*} affectedMenuItem 
     */
    toogleVerticalAsideMenu(event, affectedMenuItem) {
        const EMPTY = '';
        const DOT = ' •';
        let status = window.getComputedStyle(event.currentTarget, ':after').getPropertyValue('content');
        
        status = status.replace(/"/g, EMPTY);
        if (status.length) {
            event.currentTarget.setAttribute('status', EMPTY);
            affectedMenuItem.setAttribute('status', EMPTY);
            this.VERTICAL_MENU.style.display = 'none';
        } else {
            event.currentTarget.setAttribute('status', DOT);
            affectedMenuItem.setAttribute('status', DOT);
            this.VERTICAL_MENU.style.display = 'block';
        }
    };

    navigateTo(path) {
        window.location.replace(window.location.origin + path);
    }

    goHome() {
        this.navigateTo('/');
    }

    goDocuments() {
        this.navigateTo('/documents');
    }

    goProfile() {
        this.navigateTo('/profile');
    }

    goMessages() {
        this.navigateTo('/messages');
    }

    goConfiguration() {
        this.navigateTo('/configuration');
    }

    showLogout() {
        this.logoutDialog.show();
    }

    cancelLogout() {
        this.logoutDialog.close();
    }
    
    logout() {
        this.navigateTo('/logout');
    }
};