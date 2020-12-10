/*
--- Part Two ---

The Elves in accounting are thankful for your help; one of them even offers you a starfish coin they had left over from a past vacation. They offer you a second one if you can find three numbers in your expense report that meet the same criteria.
Using the above example again, the three entries that sum to 2020 are 979, 366, and 675. Multiplying them together produces the answer, 241861950.
In your expense report, what is the product of the three entries that sum to 2020?
*/

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
