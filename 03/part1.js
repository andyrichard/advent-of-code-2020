const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, {encoding: 'UTF-8'}).split('\n');

const isFree = (entry, i, slope) => entry[(i * slope) % entry.length] === '.';

const slope = 3;
const treesHit = input.reduce((acc, entry, i) => isFree(entry, i, slope) ? acc : acc + 1, 0);

console.log(`Trees hit: ${treesHit}`);
