const phoneBook = {
    list: {
      "John": 123456789,
      "Jane Doe": 987654321,
      "Jim Smith": 111111111
    },
    add(name, number) { // добавили метод add с параметрами name и number
      this.list[name] = number; // добавили number в свойство [name] свойства list
    },
    delete(name) {
        delete this.list[name];
    }
  };
  
  phoneBook.add("Sarah Johnson", 123123123);
//   console.log(phoneBook.list['Sarah Johnson']); // 123123123
//   phoneBook.delete("Sarah Johnson");
//   console.log(phoneBook.list['Sarah Johnson']);

// Выведите все имена и номера из книги в таком формате {имя} - {номер} (John - 123456789)

for (const name in phoneBook.list) {
    console.log(name + ' - ' + phoneBook.list[name])
}
