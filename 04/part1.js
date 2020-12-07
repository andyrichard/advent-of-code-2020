const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, {encoding: 'UTF-8'}).split('\n\n');

const requiredFields = [
	/\bbyr:/g,
	/\biyr:/g,
	/\beyr:/g,
	/\bhgt:/g,
	/\bhcl:/g,
	/\becl:/g,
	/\bpid:/g,
];

// field can only exists 1 time per passport
const isValid = (pass) => requiredFields.every((field) => (pass.match(field) || []).length === 1);
const validPassports = input.reduce((acc, pass) => isValid(pass) ? acc + 1 : acc, 0);
console.log(`Valid passports: ${validPassports}`);