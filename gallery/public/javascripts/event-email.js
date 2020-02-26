(() => {
    const email = new Email('waiting-email-response', 'msg-email', 'msg-name', 'msg-description');
    /* SEND AN EMAIL */
    document.getElementById('send-us-email').onclick = email.send.bind(email);
})();