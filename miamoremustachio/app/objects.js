const phoneBook = {
  "Ignat Ebanatovich": 223_322,
  "Izolda Ebunkova": 2_12_85_06,
  "Klavdiya Pidrilishna": 867_5309,
  "Kondratiy Zalupovich": 8_800_555_35_35,
};


const oldNumber = phoneBook["Ignat Ebanatovich"];

phoneBook["Ignat Ebanatovich"] = 322_223;

const newNumber = phoneBook["Ignat Ebanatovich"];

console.log(oldNumber !== newNumber); // true


phoneBook.oleg = 42;
phoneBook.oleg++;

console.log(phoneBook.oleg); // 43


delete phoneBook["Kondratiy Zalupovich"];

console.log(phoneBook["Kondratiy Zalupovich"]); // undefined