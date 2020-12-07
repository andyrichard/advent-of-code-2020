const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, {encoding: 'UTF-8'}).split('\n');

const isValid = (letter, char1, char2) => char1 !== char2 && (letter === char1 || letter === char2);

const validPasswords = input.reduce((acc, entry) => {
	const [p1, p2, letter, password] = entry.split(/-|:? /);
	return isValid(letter, password[p1-1], password[p2-1]) ? acc + 1 : acc;
}, 0);

console.log(`Valid passwords: ${validPasswords}`);