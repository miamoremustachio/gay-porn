function calc(operation, a, b) {
    if (typeof a != 'number' || typeof b != 'number') {
        return 'Error: invalid variable format; please, use only numbers as operands';
    }

    switch (operation) {
        case 'add':
            return (a + b);
        case 'subtract':
            return (a - b);
        case 'multi':
            return (a * b);
        default:
            return 'Error: you can use only "add", "subtract" and "multi" as operation commands';
    }
}

const additonExample = calc('add', 0, 1);
console.log(additonExample); // 1

const subtractionExample = calc('subtract', 7, 5);
console.log(subtractionExample); // 2

const multiplicationExample = calc('multi', -3, -1);
console.log(multiplicationExample); // 3

const errorExample = calc('eat', 4, 2);
console.log(errorExample); // [Error message]
// Oleg, pls stop eating numbers!!