function checkAge(age){
    if (age < 18){
        console.log('you are not allowed')
    }
    else console.log('you are welcome')
}

function calc(a, b, operation){
    switch (operation) {
        case 'add':
            return a + b;
        case 'multi':
            return a * b;
        case 'subtract':
            return a - b;
        default:
            return;
    }

