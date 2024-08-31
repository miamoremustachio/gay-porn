console.log('hello github');
console.log('worked');

function culc (operation, a, b) {
    if (operation === 'add') {
        return a + b;
} else if (operation === 'multi') {
    return a * b;
} else if (operation ==='subtract') {
    return a - b;
}
}
console.log(culc('add',1,2))
console.log(culc('multi',5,6))
