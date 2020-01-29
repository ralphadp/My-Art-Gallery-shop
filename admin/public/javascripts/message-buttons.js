class MessageButtons {

    constructor(MESSAGE_BUTTON_CLASSNAME, MESSAGE_BODY_PREFIX_ID, MESSAGE_TITLE_PREFIX_ID, COUNT_ID) {
        this.MESSAGE_BUTTON_CLASSNAME = MESSAGE_BUTTON_CLASSNAME;
        this.MESSAGE_BODY_PREFIX_ID = MESSAGE_BODY_PREFIX_ID;
        this.MESSAGE_TITLE_PREFIX_ID = MESSAGE_TITLE_PREFIX_ID;
        this.COUNT_ID = COUNT_ID;
    }

    isHideButton(button) {
        return button.getAttribute('id') === 'hide-message';
    }

    isShowButton(button) {
        return button.getAttribute('id') === 'show-message';
    }

    hideMessageEvent(event) {
        const CODE = event.currentTarget.getAttribute('code');

        document.getElementById(this.MESSAGE_BODY_PREFIX_ID + CODE).style.display = 'none';
        document.getElementById(this.MESSAGE_TITLE_PREFIX_ID + CODE).style.display = 'inline-block';
    }

    showMessageEvent(event) {
        const CODE = event.currentTarget.getAttribute('code');

        document.getElementById(this.MESSAGE_BODY_PREFIX_ID + CODE).style.display = 'inline-block';
        document.getElementById(this.MESSAGE_TITLE_PREFIX_ID + CODE).style.display = 'none';

        this.requestForMessages(CODE);
    }

    /*GET request for messages using the CODE */
    requestForMessages(CODE) {
        request({
            url: "message/reading/" + CODE,
            result: 'object'
        })
        .then(response => {
            if (response.result) {
                //update the unreaded counter
                document.getElementById(this.COUNT_ID).innerHTML = response.unreaded; 
                //set the row as unreaded
                document.getElementById(this.MESSAGE_BODY_PREFIX_ID + CODE).style.background = 'transparent';
                document.getElementById(this.MESSAGE_TITLE_PREFIX_ID + CODE).style.background = 'transparent';
            }
        })
        .catch(error => {
            console.log('Messages response error: ', error);
        });
    }

    attachEvents() {
        const messageButton = document.getElementsByClassName(this.MESSAGE_BUTTON_CLASSNAME);

        for (let index = 0; index < messageButton.length; index++) {
            let button = messageButton.item(index);

            if (this.isHideButton(button)) {
                button.addEventListener('click', this.hideMessageEvent.bind(this));
            } else if (this.isShowButton(button)) {
                button.addEventListener('click', this.showMessageEvent.bind(this));
            } else {
                console.log(`Warning: Unknown button found for [${button.getAttribute('code')}]`);
            }
        }
    }
};
