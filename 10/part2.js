const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, {encoding: 'UTF-8'}).split('\n');

const sorted = [0, ...input].map((num) => +num).sort((a, b) => a-b);

// validate against rules for including the next value
const canGetToValue = (currentValue, nextValue) => nextValue - currentValue <= 3;

const results = sorted.reduce((acc, value, i) => {
	// sum up number of valid combinations for previous sets that can include current value
	const initialCount = !i ? 1 : 0;
	const sum = acc.reduce((count, prevCount, j) => {
		return canGetToValue(sorted[j], value) ? count + prevCount : count
	}, initialCount);
	
	acc.push(sum);
	return acc;
}, []);

console.log(`Number of combination: ${results.pop()}`);
