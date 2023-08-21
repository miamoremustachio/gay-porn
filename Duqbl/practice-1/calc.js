/*function calc(a, b, operation = 'subtract') {
    if (operation == 'add') return a + b;
    else if (operation == 'multi') return a * b;
    else if (operation == 'subtract') return a % b;
  }
  console.log(calc(a = 1, b = 2, operation = 'add'));
  console.log(calc(a = 1, b = 2, operation = 'multi'));
  console.log(calc(a = 3, b = 2, operation = 'subtract'));
  console.log("Look at me, Mom, i'm making a history here")*/

function calc(a, b, operation) {
  operation = 'add';

switch (operation) {
    case 'add':
      console.log(calc(a = 1, b = 2, operation == 'add'));
      break;
    case 'multi':
      console.log(calc(a = 1, b = 2, operation == 'multi'));
      break;
    case 'subtract':
      console.log(calc(a = 3, b = 2, operation == 'subtract'));
      break;
  }
}