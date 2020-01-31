(() => {

    const menu = new Menu(
        new Frame('logout-dialog'),
        document.getElementsByClassName('item').item(1),
        document.getElementsByClassName('vertical-item').item(1),
        document.getElementsByTagName('aside').item(0)
    );

    document.getElementsByClassName('item').item(1).onclick = menu.toogleVerticalMenuWithNormalMenu.bind(menu);
    document.getElementsByClassName('vertical-item').item(1).onclick = menu.toogleVerticalMenuWithMobileMenu.bind(menu);

    document.getElementById('option-home').onclick = menu.goHome.bind(menu);

    document.getElementById('vertical-option-home').onclick = menu.goHome.bind(menu);

    document.getElementById('option-documents').onclick = menu.goDocuments.bind(menu);

    document.getElementById('vertical-option-documents').onclick = menu.goDocuments.bind(menu);

    document.getElementById('option-logout').onclick = menu.showLogout.bind(menu);

    document.getElementById('logout-yes').onclick = menu.logout.bind(menu);

    document.getElementById('logout-no').onclick = menu.cancelLogout.bind(menu);

    document.getElementById('option-profile').onclick = menu.goProfile.bind(menu);

    document.getElementById('option-messages').onclick = menu.goMessages.bind(menu);

    document.getElementById('option-configuration').onclick = menu.goConfiguration.bind(menu);

})();