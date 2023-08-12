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
    // if (operation == 'add'){
    //     return a + b;
    // }
    // else if (operation == 'multi'){
    //     return a * b;
    // }
    // else if (operation == 'subtract'){
    //     return a - b;
    // }
    // else return;
    //тест3
}

console.log(calc(1, 2, 'add'))
console.log(calc(1, 2, 'multi'))
console.log(calc(3, 2, 'subtract'))
console.log(calc(3, 2, 'subtracjt') == undefined)
console.log(calc(3, 2, 'subtracjt') == NaN);
