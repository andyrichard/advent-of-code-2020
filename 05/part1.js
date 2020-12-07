const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, {encoding: 'UTF-8'}).split('\n');

const toDecimal = (num) => parseInt(num, 2);
const maxSeatNumber = input.reduce((acc, entry) => {
	const [row, seat] = entry.replace(/F|L/g, 0).replace(/B|R/g, 1).match(/.{1,7}/g).map(toDecimal);
	const seatNumber = (row * 8) + seat;
	return acc > seatNumber ? acc : seatNumber;
}, 0);

console.log(`The maximum number is ${maxSeatNumber}`);
