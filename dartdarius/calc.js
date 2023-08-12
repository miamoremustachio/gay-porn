function calc(a, b, operation) {
  switch (operation) {
    case 'subtract':
      return a - b;
   case 'multi':
      return b * a; 
  case 'add':
      return a + b;
  break;
     } 
} 
  
  

console.log (calc(15, 14, 'subtract')) 
console.log (calc(2, 1, 'multi')) 
console.log (calc(0, 3, 'add'))   
