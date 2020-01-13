(() => 
{
    const appRequest = new LoginRequest('waiting-login-response', 'username', 'password');

    /* LOGIN AN USER */
    document.getElementById('login-form').onsubmit = appRequest.login.bind(appRequest);
    /* REQUEST A NEW PASSWORD */
    document.getElementById('forgoteen-email').onclick = appRequest.newPassword.bind(appRequest);

})();