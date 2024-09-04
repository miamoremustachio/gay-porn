const phoneBook = {
  list: {
    "John": 123456789,
    "Jane Doe": 987654321,
    "Jim Smith": 111111111
  },
  add(name, number) { 
    this.list[name] = number; 
  },
  delete(name) {
    delete this.list[name]; 
  }
};

phoneBook.add("Sarah Johnson", 123123123);
console.log(phoneBook.list['Sarah Johnson']); // 123123123

phoneBook.delete("Sarah Johnson");
console.log(phoneBook.list['Sarah Johnson']); // undefined (удалено)




for (const name in phoneBook.list) {
  console.log(name + " - " + phoneBook.list[name] );
}
