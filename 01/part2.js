const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, {encoding: 'UTF-8'}).split('\n');

const hash = {};
let value;

while (!value && input.length) {
	const number = +(input.shift());
	if (hash[number]) value = number;
	if (value) break;

	input.some((num) => {
		num = +num;
		if (hash[num]) value = num
		if (value) return true;

		const sum = number + num;
		if (sum < 2020) hash[2020 - sum] = [number, num];
	});
}

console.log(`Product: ${value * hash[value][0] * hash[value][1]}`);
