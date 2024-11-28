const ERROR = {
    INVALID_FORMAT: 'Invalid format: only string type messages are allowed.',
    EMPTY_MESSAGE: 'The message is empty: it should contains at least 1 character.',
};


function showVerticalMessage(message) {
    if (typeof message != 'string') {
        return console.error(ERROR.INVALID_FORMAT);
    } else if (!message) {
        return console.error(ERROR.EMPTY_MESSAGE);
    };

    if (message.startsWith('s')) {
        message = 'S' + message.slice(1);
    };

    const shortMessage = message.slice(0, 7);

    for (const char of shortMessage) {
        console.log(char);
    };
}

showVerticalMessage('schwarzfußkatze'); 