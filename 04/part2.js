/*
--- Part Two ---

The line is moving more quickly now, but you overhear airport security talking about how passports with invalid data are getting through. Better add some data validation, quick!
You can continue to ignore the cid field, but each other field has strict rules about what values are valid for automatic validation:

    byr (Birth Year) - four digits; at least 1920 and at most 2002.
    iyr (Issue Year) - four digits; at least 2010 and at most 2020.
    eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
    hgt (Height) - a number followed by either cm or in:
        If cm, the number must be at least 150 and at most 193.
        If in, the number must be at least 59 and at most 76.
    hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
    ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
    pid (Passport ID) - a nine-digit number, including leading zeroes.
    cid (Country ID) - ignored, missing or not.

Your job is to count the passports where all required fields are both present and valid according to the above rules.
Count the number of valid passports - those that have all required fields and valid values. Continue to treat cid as optional. In your batch file, how many passports are valid?
*/
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