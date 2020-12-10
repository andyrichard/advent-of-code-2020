/*
--- Part Two ---

To completely determine whether you have enough adapters, you'll need to figure out how many different ways they can be arranged. Every arrangement needs to connect the charging outlet to your device. The previous rules about when adapters can successfully connect still apply.
The first example above (the one that starts with 16, 10, 15) supports the following arrangements:

(0), 1, 4, 5, 6, 7, 10, 11, 12, 15, 16, 19, (22)
(0), 1, 4, 5, 6, 7, 10, 12, 15, 16, 19, (22)
(0), 1, 4, 5, 7, 10, 11, 12, 15, 16, 19, (22)
(0), 1, 4, 5, 7, 10, 12, 15, 16, 19, (22)
(0), 1, 4, 6, 7, 10, 11, 12, 15, 16, 19, (22)
(0), 1, 4, 6, 7, 10, 12, 15, 16, 19, (22)
(0), 1, 4, 7, 10, 11, 12, 15, 16, 19, (22)
(0), 1, 4, 7, 10, 12, 15, 16, 19, (22)

(The charging outlet and your device's built-in adapter are shown in parentheses.)
Given the adapters from the first example, the total number of arrangements that connect the charging outlet to your device is 8.
In total, this set of adapters can connect the charging outlet to your device in 19208 distinct arrangements.
You glance back down at your bag and try to remember why you brought so many adapters; there must be more than a trillion valid ways to arrange them! Surely, there must be an efficient way to count the arrangements.
What is the total number of distinct ways you can arrange the adapters to connect the charging outlet to your device?
*/
const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, {encoding: 'UTF-8'}).split('\n');

const sorted = [0, ...input].map((num) => +num).sort((a, b) => a-b);

// validate against rules for including the next value
const canGetToValue = (currentValue, nextValue) => nextValue - currentValue <= 3;

const results = sorted.reduce((acc, value, i) => {
	// sum up number of valid combinations for previous sets that can include current value
	const initialCount = !i ? 1 : 0;
	const sum = acc.reduce((count, prevCount, j) => {
		return canGetToValue(sorted[j], value) ? count + prevCount : count
	}, initialCount);
	
	acc.push(sum);
	return acc;
}, []);

console.log(`Number of combination: ${results.pop()}`);
