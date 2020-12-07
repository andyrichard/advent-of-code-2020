const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, {encoding: 'UTF-8'}).split('\n');

/*
	{
		'bag 1': {
			'bag 2': 1 // bag 1 contains 1x bag 2
			'bag 3': 5 // bag 1 contains 5x bag 3
		},
		...
	}
*/
const rules = input.reduce((acc, rule) => {
	if (!rule) return acc;
	if (/no other bags/.test(rule)) return acc;

	const [container, ...bags] = rule.split(/ bags contain |, /g);
	acc[container] = {};
	bags.forEach((contained) => {
		const [count, bag] = contained.replace(/ bag(s?)(\.?)$/, '').split(/ (.+)/);
		acc[container][bag] = +count;
	});

	return acc;
}, {});

const getContainedBagCount = (bag) =>
	Object.keys(rules[bag] || []).reduce((acc, containedBag) =>
		acc + (rules[bag][containedBag] * (getContainedBagCount(containedBag) + 1)), 0);

const bagCount = getContainedBagCount('shiny gold');
console.log(`shiny gold bags contain ${bagCount} bags`);
