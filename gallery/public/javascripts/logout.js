(() => 
{
    const logoutFrame = new Frame('logout-frame');

    document.getElementById('open-logout').addEventListener('click', () => {
        logoutFrame.show();
    });

    document.getElementById("open-logout-footer").addEventListener('click', () => logoutFrame.show());

    document.getElementById('logout-yes').addEventListener('click', () => {
        window.location.replace(window.location.origin + '/logout');
    });

    document.getElementById('logout-no').addEventListener('click', () => {
        logoutFrame.close();
    });
    
})();