const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, {encoding: 'UTF-8'}).split('\n');

const isWithin = (number, min, max) => min <= number && number <= max;

const validPasswords = input.reduce((acc, entry) => {
	const [min, max, letter, password] = entry.split(/-|:? /);
	const occurrences = password.split(letter).length - 1;
	return isWithin(occurrences, +min, +max) ? acc + 1 : acc;
}, 0);

console.log(`Valid passwords: ${validPasswords}`);