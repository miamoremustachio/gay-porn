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
        this.list.delete[name];
    }
  };
  
  phoneBook.add("Sarah Johnson", 123123123);
  console.log(phoneBook.list['Sarah Johnson']); // 123123123
  phoneBook.delete("Sarah Johnson");
  console.log(phoneBook.list['Sarah Johnson']);
