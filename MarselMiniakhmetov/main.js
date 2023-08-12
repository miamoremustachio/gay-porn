function calc(operator, a, b) {
    switch (operator) {
        case 'add':
            return a + b;
        case 'multi':
            return a * b;
        case 'subtract':
            return a - b;
        default:
            return 'Нет такой функции!';
    }
}

console.log(calc('add', 1, 2));
console.log(calc('multi', 1, 2));
console.log(calc('subtract', 3, 2));
console.log(calc('ERROR', NaN, NaN))

  // добавил изменений для эксперимента
  // доп изменения
  // больше изменений