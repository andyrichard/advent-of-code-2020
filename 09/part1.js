const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, {encoding: 'UTF-8'}).split('\n');

const workingSet = {
	initialLength: 25,
	hash: {},
	entries: []
};

function addToWorkingSet(value) {
	workingSet.hash[value] = workingSet.hash[value] || 0;
	workingSet.hash[value]++;
	workingSet.entries.push(+value);
}

function shiftWorkingSet() {
	const numOrUndefined = workingSet.entries.shift();
	workingSet.hash[numOrUndefined]--;
}

function sumOfTwoWorkingSetValues(target) {
	return workingSet.entries.some((num) => workingSet.hash[+target - num])
}

// populate working set with initial X values
input.slice(0, workingSet.initialLength).forEach(addToWorkingSet);

// find a value that is not a sum of any 2 of the 25 previous entries
const invalidValue = input.slice(workingSet.initialLength).find((nextNum) => {
	if (!sumOfTwoWorkingSetValues(nextNum)) return true;
	addToWorkingSet(nextNum);
	shiftWorkingSet();
});

console.log(`Invalid Value: ${invalidValue}`);