function createCounter() {
  let i = 0;
  
  const counter = () => ++i;
  
  return counter;
}

const counterA = createCounter();
const counterB = createCounter();

console.log( counterA() ); // 1
console.log( counterA() ); // 2
console.log( counterA() ); // 3

console.log( counterB() ); // 1 (YAY!)