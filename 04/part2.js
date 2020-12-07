const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, {encoding: 'UTF-8'}).split('\n\n');

const requiredFields = [
	[/byr:/g, /\b(byr:(19[2-9][0-9]|200[0-2]))\b/],
	[/iyr:/g, /\b(iyr:20(1[0-9]|20))\b/],
	[/eyr:/g, /\b(eyr:20(2[0-9]|30))\b/],
	[/hgt:/g, /\b(hgt:((1[5-8][0-9]|19[0-3])cm|(59|6[0-9]|7[0-6])in))\b/],
	[/hcl:/g, /\b(hcl:#[a-f0-9]{6})\b/],
	[/ecl:/g, /\b(ecl:(amb|blu|brn|gry|grn|hzl|oth))\b/],
	[/pid:/g, /\b(pid:[0-9]{9})\b/]
];

// field can only exists 1 time per passport
const isValid = (pass) => requiredFields.every((field) =>
	(pass.match(field[0]) || []).length === 1 && pass.match(field[1]));

const validPassports = input.reduce((acc, pass) => isValid(pass) ? acc + 1 : acc, 0);
console.log(`Valid passports: ${validPassports}`);