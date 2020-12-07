/*
	Not as performant as part2 with this given input.
	Allows for easy modification of passports if needed.
*/
const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, {encoding: 'UTF-8'}).split('\n\n');

const requiredFields = [
	['byr', (v) => /^(19[2-9][0-9]|200[0-2])$/.test(v)],
	['iyr', (v) => /^20(1[0-9]|20)$/.test(v)],
	['eyr', (v) => /^20(2[0-9]|30)$/.test(v)],
	['hgt', (v) => /^((1[5-8][0-9]|19[0-3])cm|(59|6[0-9]|7[0-6])in)$/.test(v)],
	['hcl', (v) => /^#[a-f0-9]{6}$/.test(v)],
	['ecl', (v) => /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(v)],
	['pid', (v) => /^[0-9]{9}$/.test(v)]
];

const isValid = (pass) => !pass.invalid && requiredFields.every((field) => field[1](pass[field[0]]));
const mapPassportToObject = (pass) => pass.split(/\s+/).reduce((acc, entry) => {
	const parts = entry.split(':');
	if (typeof acc[parts[0]] === 'string') acc.invalid = true // field can only exists 1 time per passport
	
	acc[parts[0]] = parts[1];
	return acc;
}, {});

const validPassports = input.reduce((acc, pass) => {
	const passportObj = mapPassportToObject(pass);
	return isValid(passportObj) ? acc + 1 : acc;
}, 0);

console.log(`Valid passports: ${validPassports}`);