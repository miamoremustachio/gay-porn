function calc(operation,a,b){
    switch (operation) {
        case 'substract':
            return (a-b)
        case 'multi':
            return (a*b)
        case 'add':
            return (a+b)
        default:
            return 'Я не понял, что вы имели ввиду.'
    }
}
console.log(calc ('substract',3,2))
console.log(calc ('multi',2,1))
console.log(calc ('add',1,2))
console.log(calc ('hello world',2,3))