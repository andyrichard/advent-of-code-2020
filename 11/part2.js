/*
--- Part Two ---

As soon as people start to arrive, you realize your mistake. People don't just care about adjacent seats - they care about the first seat they can see in each of those eight directions!
Now, instead of considering just the eight immediately adjacent seats, consider the first seat in each of those eight directions. For example, the empty seat below would see eight occupied seats:

.......#.
...#.....
.#.......
.........
..#L....#
....#....
.........
#........
...#.....

Also, people seem to be more tolerant than you expected:
it now takes five or more visible occupied seats for an occupied seat to become empty (rather than four or more from the previous rules).
The other rules still apply:
    empty seats that see no occupied seats become occupied
    seats matching no rule don't change
    floor never changes.

Given the new visibility method and the rule change for occupied seats becoming empty,
once equilibrium is reached, how many seats end up occupied?
*/
const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, {encoding: 'UTF-8'}).split('\n');

const directions = [
    'up-left', 'up', 'up-right', 'left', 'right', 'down-left', 'down', 'down-right'
];

/* Rules to complete part 1 */
// const offsetLimit = 1;
// const neighbourLimits = {'L': 1, '#': 4};

/* Rules to complete part 2 */
const offsetLimit = 0;
const neighbourLimits = {'L': 1, '#': 5};

/*
    Generate list of nearest neighbours for each seat
    Avoid having to do expensive look-ups every time
*/
function getNearestNeighbour(dir, seats, rowNumber, seatNumber, rowOffset = 0, seatOffset = 0) {
    const row = seats[rowNumber + rowOffset];
    if (!row) return;

    const seat = row[seatNumber + seatOffset];
    if (!seat) return;
  
    const isOwnSeat = !rowOffset && !seatOffset;
    if (!isOwnSeat && seat !== '.') {
        return {
            row: rowNumber + rowOffset,
            seat: seatNumber + seatOffset
        };
    }

    const absRowOffset = Math.abs(rowOffset);
    const absSeatOffset = Math.abs(seatOffset);
    const rowOffsetLimitReached = offsetLimit && (absRowOffset === offsetLimit);
    const seatOffsetLimitReached = offsetLimit && (absSeatOffset === offsetLimit);
    
    if (!/left|right/.test(dir) && rowOffsetLimitReached) return; // only up/down
    if (!/up|down/.test(dir) && seatOffsetLimitReached) return;   // only left/right
    if (rowOffsetLimitReached && seatOffsetLimitReached) return;  // any direction

    if (/up/.test(dir)) rowOffset--;
    else if (/down/.test(dir)) rowOffset++;

    if (/left/.test(dir)) seatOffset--;
    else if (/right/.test(dir)) seatOffset++;


    return getNearestNeighbour(dir, seats, rowNumber, seatNumber, rowOffset, seatOffset);
}

function getNearestNeighbours(input, rowNumber, seatNumber) {
    if (input[rowNumber][seatNumber] === '.') return [];
    return directions.reduce((acc, direction) => {
        const neighbour = getNearestNeighbour(direction, input, rowNumber, seatNumber);
        if (neighbour) acc.push(neighbour);
        return acc;
    }, []);
}

const neighbourList = input.reduce((acc, row, rowNumber) => {
    const details = row.split('').reduce((neighbourSets, seat, seatNumber) => {
        neighbourSets.push(getNearestNeighbours(input, rowNumber, seatNumber));
        return neighbourSets;
    }, []);
    acc.push(details);
    return acc;
}, []);




function seatShouldBeEmpty(inputSet, rowNum, seatNum, neighbourLimit) {
    let neighbours = 0;
    for (const neighbour of neighbourList[rowNum][seatNum]) {
        if (inputSet[neighbour.row][neighbour.seat] === '#') neighbours++;
        if (neighbours >= neighbourLimit) break;
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