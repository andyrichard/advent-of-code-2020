const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, {encoding: 'UTF-8'}).split('\n');

const invalidValue = 400480901; // value from part 1

function getSubsetEqualToValue(valueArray, target, index) {
	let sum = +valueArray[index];
	if (sum >= target) return []; // at least 2 values must be summed
	
	const subset = [sum];
	for (let i = index + 1; i < valueArray.length; i++) {
		sum += +valueArray[i];
		subset.push(+valueArray[i]);
		if (sum > target) return [];
		if (sum === target) return subset;
	}
}

let i = 0;
let subset = [];
while (!subset.length && i < input.length) {
	subset = getSubsetEqualToValue(input, invalidValue, i);
	i++;
}

const min = subset.length ? Math.min(...subset) : NaN;
const max = subset.length ? Math.max(...subset) : NaN;
console.log(`Min: ${min}\nMax: ${max}\nSum: ${min + max}`);
