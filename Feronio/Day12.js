function calc(operation,a,b) {
    switch(operation){
        case 'add':
            return a+b;
            break;
        case 'substract':
            return a-b;
            break;
        case 'multi':
            return a*b;
            break;
         }
}
let result_1 = calc('add',1,2);
let result_2 = calc('multi',1,2);
let result_3 = calc('substract',3,2);
console.log(result_1);
console.log(result_2);
console.log(result_3);

