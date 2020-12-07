const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, {encoding: 'UTF-8'}).split('\n');

const hash = {};
const number = input.find((number) => {
	hash[2020-number] = +number;
	return hash[number];
});

console.log(`Product: ${number * (2020 - number)}`);
