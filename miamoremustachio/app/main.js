const ERRORS = {
  INVALID_MESSAGE: 'Error: Invalid message (only strings are allowed).',
};

const { INVALID_MESSAGE } = ERRORS;

function showVerticalMessage(message) {
  const charToUpperCase = 's';
  const messageLength = 7;

  if (typeof message !== 'string') {
    console.error(INVALID_MESSAGE);
    return;
  }

  let printedMessage = message.slice(0, messageLength);

  if (message.startsWith(charToUpperCase)) {
    printedMessage = charToUpperCase.toUpperCase() + printedMessage.slice(1);
  }

  for (let char of printedMessage) {
    console.log(char);
  }
}

// tests:
showVerticalMessage('weathercock'); // ✓
showVerticalMessage('oleg'); // ✓

showVerticalMessage('software'); // ✓
showVerticalMessage('sus'); // ✓

showVerticalMessage(42); // ✗
showVerticalMessage('42'); // ✓