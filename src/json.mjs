
// read json file
import fs from 'fs';

const rawData = fs.readFileSync('./students.json');
const data = JSON.parse(rawData);
console.log(data);
// Modify the data
data.age = 26;
data.city = 'San Francisco';

// Convert the modified data back to JSON format
const modifiedJson = JSON.stringify(data, null, 2);

// Write the modified JSON data to a file
fs.writeFileSync('modifiedData.json', modifiedJson);

console.log('Modified data has been written to modifiedData.json');