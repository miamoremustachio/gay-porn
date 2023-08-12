function cals(a, b, operation) {
    switch (operation) {
        case 'add':
            return a + b;
            break;
        case 'multi':
            return a * b;
            break;
        case 'subtract':
            return a - b;
            break;
        default:
            console.log('Нет таких значений');    
    }
}
console.log(cals(3, 3, 'add'));
console.log(cals(3, 3, 'multi'));
console.log(cals(3, 3, 'subtract'));
console.log(cals(3, 3, 'drugoe'));