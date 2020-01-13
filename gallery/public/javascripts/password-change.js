(() => 
{
    const appRequest = new LoginRequest('waiting-login-response', 'username', 'password');

    /* COMPARING PASSWORDS */
    document.getElementById('password').onkeyup = appRequest.comparePassword.bind(appRequest);
    document.getElementById('confirm_password').onkeyup = appRequest.comparePassword.bind(appRequest);
    /* CHANGE PASSWORD */
    document.getElementById('change-password-form').onsubmit = appRequest.comparePassword.bind(appRequest);
})();