/*
--- Part Two ---

As you finish the last group's customs declaration, you notice that you misread one word in the instructions:
You don't need to identify the questions to which anyone answered "yes"; you need to identify the questions to which everyone answered "yes"!
Using the same example as part 1:

This list represents answers from five groups:

    In the first group, everyone (all 1 person) answered "yes" to 3 questions: a, b, and c.
    In the second group, there is no question to which everyone answered "yes".
    In the third group, everyone answered yes to only 1 question, a. Since some people did not answer "yes" to b or c, they don't count.
    In the fourth group, everyone answered yes to only 1 question, a.
    In the fifth group, everyone (all 1 person) answered "yes" to 1 question, b.

In this example, the sum of these counts is 3 + 0 + 1 + 1 + 1 = 6.
For each group, count the number of questions to which everyone answered "yes". What is the sum of those counts?
*/
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
