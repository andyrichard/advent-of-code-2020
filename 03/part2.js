/*
--- Part Two ---

Time to check the rest of the slopes - you need to minimize the probability of a sudden arboreal stop, after all.
Determine the number of trees you would encounter if, for each of the following slopes, you start at the top-left corner and traverse the map all the way to the bottom:

    Right 1, down 1.
    Right 3, down 1. (This is the slope you already checked.)
    Right 5, down 1.
    Right 7, down 1.
    Right 1, down 2.

In the above example, these slopes would find 2, 7, 3, 4, and 2 tree(s) respectively; multiplied together, these produce the answer 336.
What do you get if you multiply together the number of trees encountered on each of the listed slopes?
*/
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
