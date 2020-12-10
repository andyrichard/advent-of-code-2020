/*
--- Part Two ---

Ding! The "fasten seat belt" signs have turned on. Time to find your seat.
It's a completely full flight, so your seat should be the only missing boarding pass in your list. However, there's a catch: some of the seats at the very front and back of the plane don't exist on this aircraft, so they'll be missing from your list as well.
Your seat wasn't at the very front or back, though; the seats with IDs +1 and -1 from yours will be in your list.
What is the ID of your seat?
*/
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
