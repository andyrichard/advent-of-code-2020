const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, {encoding: 'UTF-8'}).split('\n');

// include 0 and max + 3 to account for all gaps
const sorted = [0, ...input].map((num) => +num).sort((a, b) => a-b);
sorted.push(sorted[sorted.length-1] + 3);

const data = sorted.reduce((acc, value, i) => {
	if (!i) return acc;

	acc[value - sorted[i-1]] = acc[value - sorted[i-1]] || 0;
	acc[value - sorted[i-1]]++;
	return acc;
}, {'1': 0, '3': 0});

console.log(`Product: ${data[1] * data[3]}`)