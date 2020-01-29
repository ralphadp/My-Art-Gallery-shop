(() => {

    const messageButtons = new MessageButtons(
        'message-button', 
        'message-complete-', 
        'message-title-', 
        'unread-messages-count'
    );

    messageButtons.attachEvents();

})();