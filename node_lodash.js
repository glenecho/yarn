// import { map, filter } from 'lodash';

//for node
const { map, filter } = require('lodash');

const numbers = [1, 2, 3, 4, 5];

// Use the map function from lodash to double each number in the array
const doubledNumbers = map(numbers, (num) => num * 2);
console.log(doubledNumbers); // Output: [2, 4, 6, 8, 10]

// Use the filter function from lodash to get only even numbers from the array
const evenNumbers = filter(numbers, (num) => num % 2 === 0);
console.log(evenNumbers); // Output: [2, 4]