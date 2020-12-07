const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, {encoding: 'UTF-8'}).split('\n');

/*
	{
		'bag 1': ['bag 2', 'bag 3'], // bag 1 is found in bag 2 and bag 3
		...
	}
*/
const rules = input.reduce((acc, rule) => {
	if (!rule) return acc;
	if (/no other bags/.test(rule)) return acc;

	const [container, ...bags] = rule.split(/ bags contain |, /g);
	bags.forEach((contained) => {
		const bag = contained.replace(/(^\d* | bag(s?)(\.?))/g, '');
		acc[bag] = acc[bag] || [];
		acc[bag].push(container);
	});

	return acc;
}, {});

const getBagsThatCanContainBag = (bag) =>
	(rules[bag] || []).reduce((acc, containedBag) =>
		Object.assign(acc, {[containedBag]: true}, getBagsThatCanContainBag(containedBag)), {});

const bags = getBagsThatCanContainBag('shiny gold');
console.log(`shiny gold bags are found in ${Object.keys(bags).length} bags`);
