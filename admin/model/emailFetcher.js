var fetch = require('node-fetch');
var Util = require('./util');
var {EventEmitter} = require('events');

/*TODO: need to hide the mailtrap.io token and set it from configuration*/
const headers = {
    "Api-Token": "c91bb9378f5f7860b45ae4a1f0b29fab",
    "Accept": "application/json",
    "Content-Type": "application/json"
};

const txtHeaders = {
    "Api-Token": "c91bb9378f5f7860b45ae4a1f0b29fab",
    "Accept": "text/plain",
};

const checkIncomingMessages = (resolve, failback) => {
    fetch(
        'https://mailtrap.io/api/v1/inboxes',
        {
          method: 'GET', 
          headers: headers
        }
    )
    .then(response => response.json())
    .then(content => {
    
        if (typeof content.error !== 'undefined') {
            return failback (new Error(content.error));
        }

        if (!content.length) {
            return failback (new Error('Content is empty'));
        }

        Util.getValueOfStorage(
            'READED_MESSAGES_COUNTER', 
            (messagesCount) => {
                if (isNaN(messagesCount)) {
                    console.log('Could not found the COUNTER');
                    resolve(Number(content[0].emails_count));
                } else {
                    resolve(Number(content[0].emails_count) - Number(messagesCount));
                }
            },
            (error) => {
                failback(error);
            }
        );
        
    })
    .catch(error => {
        console.log(error);
        failback (new Error(content.error));
    });
};

const verifyMessagesCounter = (emitter) => {
    checkIncomingMessages(
        (count) => {
            if (count) {
                console.log(count + ' incoming messages');
                emitter.emit('new-email', count);
            } else {
                console.log('No new incoming messages');
            }
        },
        (error) => {
            console.log('ERROR: ', error.message);
        } 
    );
}

const emailEventEmitter = (minutes) => {
    const emitter = new EventEmitter();

    verifyMessagesCounter(emitter);

    setInterval(() => {
        verifyMessagesCounter(emitter);
    }, 60000 * minutes);

    return emitter;
}

module.exports.checkIncomingMessages = checkIncomingMessages;
module.exports.emailEventEmitter = emailEventEmitter;