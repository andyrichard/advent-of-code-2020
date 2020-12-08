const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, {encoding: 'UTF-8'}).split('\n');

let value = currentOp = 0;
const instructionsRun = {};

while (input[currentOp] && !instructionsRun[currentOp]) {
	instructionsRun[currentOp] = true;

	const [op, count] = input[currentOp].split(' ');
	if (op === 'acc') value += +count;
	currentOp += op === 'jmp' ? +count : 1;
}

console.log(`Value: ${value}`);