const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, {encoding: 'UTF-8'}).split('\n');

const wholeNum = (num) => (num * 1) % 1 === 0;
const isFree = (entry, i, slope) => !wholeNum(i * slope) || entry[(i * slope) % entry.length] === '.';

const slopes = [1, 3, 5, 7, 0.5];
const product = slopes.reduce((acc, slope) => {
	const treesHit = input.reduce((acc, entry, i) => isFree(entry, i, slope) ? acc : acc + 1, 0);
	return acc * treesHit;
}, 1);

console.log(`Product of trees hit: ${product}`);
