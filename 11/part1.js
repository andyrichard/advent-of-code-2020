/*
--- Day 11: Seating System ---

Your plane lands with plenty of time to spare.
The final leg of your journey is a ferry that goes directly to the tropical island where you can finally start your vacation.
As you reach the waiting area to board the ferry, you realize you're so early, nobody else has even arrived yet!
By modeling the process people use to choose (or abandon) their seat in the waiting area, you're pretty sure you can predict the best place to sit.
You make a quick map of the seat layout (your puzzle input).
The seat layout fits neatly on a grid. Each position is either floor (.), an empty seat (L), or an occupied seat (#). For example, the initial seat layout might look like this:

L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL

Now, you just need to model the people who will be arriving shortly.
Fortunately, people are entirely predictable and always follow a simple set of rules.
All decisions are based on the number of occupied seats adjacent to a given seat (one of the eight positions immediately up, down, left, right, or diagonal from the seat).
The following rules are applied to every seat simultaneously:

    If a seat is empty (L) and there are no occupied seats adjacent to it, the seat becomes occupied.
    If a seat is occupied (#) and four or more seats adjacent to it are also occupied, the seat becomes empty.
    Otherwise, the seat's state does not change.

Floor (.) never changes; seats don't move, and nobody sits on the floor.

At some point, something interesting happens:
the chaos stabilizes and further applications of these rules cause no seats to change state!
Once people stop moving around, you count 37 occupied seats.

Simulate your seating area by applying the seating rules repeatedly until no seats change state.
How many seats end up occupied?
*/
const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, {encoding: 'UTF-8'}).split('\n');

const offsets = [-1, 0 ,1];
const neighbourLimits = {'L': 1, '#': 4};

function seatShouldBeEmpty(inputSet, rowNum, seatNum, neighbourLimit) {
    let neighbours = 0;
    for (const rowOffset of offsets) {
        const row = inputSet[rowNum + rowOffset];
        if (!row) continue;

        for (const seatOffset of offsets) {
            if (neighbours >= neighbourLimit) break;
            if (!rowOffset && !seatOffset) continue;
            if (row[seatNum + seatOffset] === '#') neighbours++;
        }
    }

    return neighbours >= neighbourLimit;
}

function getUpdatedRow(inputSet, row, rowNum) {
    return row.split('').reduce((acc, seat, seatNum) => {
        if (seat === '.') return acc + seat;
        seat = seatShouldBeEmpty(inputSet, rowNum, seatNum, neighbourLimits[seat]) ? 'L' : '#';
        return acc + seat;
    }, '');
}

function getUpdatedSeats(inputSet) {
    return inputSet.reduce((acc, row, rowNum) => {
        const updatedRow = getUpdatedRow(inputSet, row, rowNum);
        if (row !== updatedRow) acc.change = true;

        acc.seats.push(updatedRow);
        
        return acc;
    }, {seats: [], change: false});
}

let updatedData = getUpdatedSeats(input);
while (updatedData.change) {
    updatedData = getUpdatedSeats(updatedData.seats);
}

const occupiedSeats = updatedData.seats.join('').split('#').length - 1;
console.log(`There are \x1b[32m${occupiedSeats}\x1b[0m occupied seats.`);