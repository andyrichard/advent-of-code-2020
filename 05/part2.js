const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, {encoding: 'UTF-8'}).split('\n');

const toDecimal = (num) => parseInt(num, 2);
const seats = input.reduce((acc, entry) => {
	const [row, seat] = entry.replace(/F|L/g, 0).replace(/B|R/g, 1).match(/.{1,7}/g).map(toDecimal);
	const seatNumber = (row * 8) + seat;
	acc[seatNumber] = true;
	acc.numbers.push(seatNumber);
	return acc;
}, {numbers: []});

let mySeat;
seats.numbers.some((seat) => {
	if (seats[seat - 2] && !seats[seat - 1]) mySeat = seat - 1;
	else if (seats[seat + 2] && !seats[seat + 1]) mySeat = seat + 1;
	return mySeat;
});

console.log(`My seat number is ${mySeat}`);
