// let vs = 
function сalc(operation, a, b) { 

// let accessAllowed = (age >= 18) ? 'you are  welcome' : 'you are not welcome';
// console.log(accessAllowed); 
// return a+b
switch (operation) {
    case 'add':
        
        return a + b
    case 'multi':
        return a * b
    case 'subtract':
        return a - b    
    default:
        return ('we don`t have this operator')
}
}
	


// checkAge(18);

console.log(сalc('add', 1, 2) )
console.log(сalc('multi', 6, 2) )
console.log(сalc('subtract', 3, 2) )
console.log(сalc('logarifm', 3, 2) )
console.log("all done" )