function calc(operation, a, a2) {
    switch (operation) {
        case 'add':
            return (a + a2);
        case 'multi':
            return (a * a2);
        case 'subtract':
            return (a - a2);
        default:
            return 'unknown operation';
    }
}

console.log(calc('add', 1, 2), calc('multi', 1, 2),
    calc('subtract', 3, 2));