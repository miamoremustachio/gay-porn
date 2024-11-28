// task #1
const someIntegers = [2, 12, 85, 0, 6];

function showNumbersIn(arr) {
    arr.forEach(number => { console.log(`Number is ${number}`) });
}

showNumbersIn(someIntegers);


// task #2
const someAnimals = ['cat', 'dog', 'elephant', 'tiger', 'lion'];

const getLongWord = (arr) => arr.find(word => word.length > 7);

console.log(getLongWord(someAnimals));


// task #3
const someNumbers = [1, 11, -2, 3, -10, 4];

const negativeNumbers = someNumbers.filter(num => num < 0);
console.log(negativeNumbers);


// task #4
const absoluteValues = someNumbers.map(num => Math.abs(num));
console.log(absoluteValues);


// task #5
someNumbers.sort((a, b) => b - a);
console.log(someNumbers);