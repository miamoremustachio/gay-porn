const CONTACTS = {
  IGNAT: "Ignat Ebanatovich",
  IZOLDA: "Izolda Ebunkova",
  KLAVDIYA: "Klavdiya Pidrilishna",
  KONDRATIY: "Kondratiy Zalupovich",
};

const ERRORS = {
  CONTACT_EXIST: "Error: Contact already exists",
  CONTACT_NOT_FOUND: "Error: Contact not found.",
};

const { IGNAT, IZOLDA, KLAVDIYA, KONDRATIY } = CONTACTS;
const { CONTACT_EXIST, CONTACT_NOT_FOUND } = ERRORS;

const phoneBook = {
  list: {
    [IGNAT]: 223_322,
    [IZOLDA]: 2_12_85_06,
    [KLAVDIYA]: 867_5309,
    [KONDRATIY]: 8_800_555_35_35,
  },

  add(contact, phoneNumber) {
    if (this.isContactExists(contact)) {
      return console.error(CONTACT_EXIST);
    }

    this.list[contact] = phoneNumber;
  },

  delete(contact) {
    if (!this.isContactExists(contact)) {
      return console.error(CONTACT_NOT_FOUND);
    }

    delete this.list[contact];
  },

  log() {
    for (const name in this.list) {
      console.log( `${name} - ${this.list[name]}`);
    }
  },

  isContactExists(contact) {
    return contact in this.list;
  },
};


// tests:
phoneBook.log();

phoneBook.add('Oleg', 42); // ✓
phoneBook.add('Olga'); // ✓ 
// TODO: add phoneNumber existence validation
phoneBook.add(IGNAT); // ✗ 

phoneBook.delete(IZOLDA); // ✓
phoneBook.delete('Rick Astley');  // ✗

phoneBook.log();