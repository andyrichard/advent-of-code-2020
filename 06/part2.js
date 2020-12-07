const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, {encoding: 'UTF-8'}).split('\n\n');

const count = input.reduce((acc, entry) => {
	const members = entry.split('\n');
	const group = members.join('').split('').reduce((group, entry) => {
		group[entry] = group[entry] ? group[entry] + 1 : 1;
		return group;
	}, {});
	
	return acc + Object.keys(group).filter((key) => group[key] === members.length).length;
}, 0);

console.log(count);
