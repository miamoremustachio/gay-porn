function checkAge(age) {
    if (age < 18) {
        console.log('you are not allowed');
    } else if (age >= 18) {
        console.log('you are welcome !');
    }
}
checkAge(18);
checkAge(15);

function cals(a, b, operation) {
    if (operation == 'add') {
        return a + b;
    } else if (operation == 'multi') {
        return a * b;
    } else if (operation == 'subtract') {
        return a - b;
    }
}

console.log(cals(3, 3, 'add'));
console.log(cals(3, 3, 'multi'));
console.log(cals(3, 3, 'subtract'));

