const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, {encoding: 'UTF-8'}).split('\n');

function broken(opSet) {
	let value = currentOp = 0;
	const instructionsRun = {};

	while (opSet[currentOp]) {
		if (instructionsRun[currentOp]) return true;
		instructionsRun[currentOp] = true;

		const [op, count] = opSet[currentOp].split(' ');
		if (op === 'acc') value += +count;
		currentOp += op === 'jmp' ? +count : 1;
	}
	
	console.log(`Value: ${value}`);
}

/*
	When in doubt, brute force FTW
*/
const swap = (entry) => ({jmp: 'nop', nop: 'jmp'}[entry]);
for (let i = 0; i < input.length; i++) {
	const opSet = [...input];
	opSet[i] = opSet[i].replace(/jmp|nop/, swap);
	if (!broken(opSet)) break;
}