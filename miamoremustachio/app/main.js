const CONTACTS = {
  IGNAT: 'Ignat Ebanatovich',
  IZOLDA: 'Izolda Ebunkova',
  KLAVDIYA: 'Klavdiya Pidrilishna',
  KONDRATIY: 'Kondratiy Zalupovich',
};

const ERRORS = {
  CONTACT_EXIST: 'Error: Contact already exists.',
  CONTACT_NOT_FOUND: 'Error: Contact not found.',
  INVALID_PHONE_NUMBER: 'Error: Invalid phone number.',
};

const { IGNAT, IZOLDA, KLAVDIYA, KONDRATIY } = CONTACTS;
const { CONTACT_EXIST, CONTACT_NOT_FOUND, INVALID_PHONE_NUMBER } = ERRORS;

function isContactExists(contact, list) {
  return contact in list;
}

function isPhoneNumberValid(phoneNumber) {
  return (Number.isFinite(phoneNumber) && phoneNumber > 0 && phoneNumber <= 15);
}

const phoneBook = {
  list: {
    [IGNAT]: 223_322,
    [IZOLDA]: 2_12_85_06,
    [KLAVDIYA]: 867_5309,
    [KONDRATIY]: 8_800_555_35_35,
  },

  add(contact, phoneNumber) {
    if (isContactExists(contact, this.list)) {
      return console.error(CONTACT_EXIST);
    }

    if (!isPhoneNumberValid(phoneNumber)) {
      return console.error(INVALID_PHONE_NUMBER);
    }

    this.list[contact] = phoneNumber;
  },

  delete(contact) {
    if (!isContactExists(contact, this.list)) {
      return console.error(CONTACT_NOT_FOUND);
    }

    delete this.list[contact];
  },

  log() {
    for (const name in this.list) {
      console.log( `${name} - ${this.list[name]}`);
    }
  },
};


// tests:
phoneBook.log();

phoneBook.add('Oleg', 1); // ✓
phoneBook.add('Olga', -1); // ✗
phoneBook.add('Olga', 42); // ✗
phoneBook.add('Olga'); // ✗
phoneBook.add(IGNAT); // ✗ 

phoneBook.delete(IZOLDA); // ✓
phoneBook.delete('Rick Astley');  // ✗

phoneBook.log();