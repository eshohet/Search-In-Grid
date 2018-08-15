/*
    Given a 10 x 10 grid of alphabetic characters, write an algorithm for finding a specific word within the grid.
    Letters in the word may be joined horizontally, vertically, or even diagonally -
    but the same letter may not be used more than once in the word (ie: no reversal).
    The algorithm should return the grid position ("x,y" coordinates) of each letter in the word as a set (array).
*/

const matrix =
    [
        ['H', 'E', 'L', 'L', 'O', 'T', 'Z', 'X', 'Y', 'H'],
        ['H', 'E', 'L', 'L', 'O', 'T', 'Z', 'X', 'Y', 'E'],
        ['Z', 'M', 'L', 'E', 'R', 'T', 'Z', 'X', 'Y', 'L'],
        ['Z', 'H', 'D', 'L', 'R', 'T', 'Z', 'X', 'Y', 'L'],
        ['Z', 'M', 'E', 'E', 'O', 'T', 'Z', 'X', 'Y', 'O'],
        ['Z', 'M', 'D', 'L', 'R', 'T', 'Z', 'X', 'Y', 'M'],
        ['Z', 'M', 'D', 'E', 'L', 'T', 'Z', 'X', 'Y', 'M'],
        ['Z', 'M', 'D', 'E', 'R', 'O', 'Z', 'X', 'Y', 'M'],
        ['Z', 'M', 'D', 'E', 'R', 'T', 'Z', 'X', 'Y', 'M'],
        ['Z', 'M', 'D', 'E', 'R', 'O', 'L', 'L', 'E', 'H'],
    ];
const word = "HELLO";

/*
    Function that searches for the word in every direction possible

    1. Return false if first letter doesn't match
    2. Break if out of bounds
    3. Break if character does not match in sequence when searching
 */

function search(row, col) {
    const firstCharacter = word[0];

    //Condition #1
    if (matrix[row][col] !== firstCharacter)
        return false;

    /*
        Search in all 8 directions
        0 1 2
        3 X 4
        5 6 7
     */

    let coordinates = [];

    for (let direction = 0; direction < 8; direction++) {
        //offset the search by -1 and 1 depending on the direction
        let rowOffset, colOffset;
        switch (direction) {
            case 0:
                rowOffset = -1;
                colOffset = -1;
                break;
            case 1:
                rowOffset = 0;
                colOffset = -1;
                break;
            case 2:
                rowOffset = 1;
                colOffset = -1;
                break;
            case 3:
                rowOffset = -1;
                colOffset = 0;
                break;
            case 4:
                rowOffset = 1;
                colOffset = 0;
                break;
            case 5:
                rowOffset = -1;
                colOffset = 1;
                break;
            case 6:
                rowOffset = 0;
                colOffset = 1;
                break;
            case 7:
                rowOffset = 1;
                colOffset = 1;
                break;
        }

        //begin character matching

        let wordIndex = 1;

        for (wordIndex; wordIndex < word.length; wordIndex++) {

            //Condition #2; check for out of bounds
            if (
                row + rowOffset * wordIndex >= matrix.length ||
                col + colOffset * wordIndex >= matrix[0].length ||
                row + rowOffset * wordIndex < 0 ||
                col + colOffset * wordIndex < 0
            )
                break;

            //Condition #3
            if (word[wordIndex] !== matrix[row + rowOffset * wordIndex][col + colOffset * wordIndex])
                break;

            coordinates.push([
                `(${row + rowOffset * wordIndex},${col + colOffset * wordIndex})`
            ]);

        }

        if (wordIndex === word.length) {
            coordinates.unshift(['(' + row + ',' + col + ')']);
            return coordinates;
        }
        else {
            coordinates = [];
        }
    }

    return false;
}

console.log(`searching for ${word} in 10x10 matrix`);

for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
        const found = search(row, col);
        if (found) {
            console.log(`found in path: ${found.toString()}`);
        }
    }
}
