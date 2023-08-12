// function sayHi(name, age = 18) {
//     const greeting = 'Привет ' + name + ' Как дела?! Тебе ' + age + ' лет?'
//     console.log(greeting)
// }

// sayHi('Alex')

// function checkAge(age) {
//     age < 18 ? console.log('you not allowed') : console.log('you are welcome')
// }

// checkAge(18)

// function calc(a, b, operation) {
//     if (operation == 'add') {
//         return a + b
//     } else if (operation == 'multi') {
//         return a * b
//     } else if (operation == 'subtract') {
//         return b - a
//     }
// }

function calc(a, b, operation) {
    
    switch (operation) {
        case 'add':
            return a + b;
        case 'multi':
            return a * b;
        case 'subtract':
            return b - a;
        default:
            return 'Error!'
    }
}

console.log(calc(3, 2, 'add'))
console.log(calc(3, 2, 'multi'))
console.log(calc(3, 2, 'subtract'))
console.log(calc(5, 10, 'add'));
console.log(calc(5, 10, ));

function checkName(name = 'Пользователь') {
    switch (name) {
        case 'John':
            return 'Меня зовут Джон';
        case 'Petr':
            return 'Хёй, я Петр';
        case 'Alex':
            return 'Я, Алекс'
        default:
            return 'Какое-то странное имя'
    }
}

console.log(checkName('Alex'))
console.log(checkName(''))
console.log(checkName('Petr'))