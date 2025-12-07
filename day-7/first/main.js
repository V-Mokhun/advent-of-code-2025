const fs = require("fs");

let input = fs.readFileSync("../input.txt", "utf-8");
input = input.split("\n").filter((line) => line.length > 0);

const matrix = input.map((line) => line.split(""));
const ROWS = matrix.length;
const COLS = matrix[0].length;

let startCol = -1;
for (let col = 0; col < COLS; col++) {
  if (matrix[0][col] === "S") {
    startCol = col;
    break;
  }
}

let activeBeams = new Map();
activeBeams.set(0, new Set([startCol]));

let splits = new Set();

for (let row = 0; row < ROWS; row++) {
  const currentBeams = activeBeams.get(row);

  const nextBeams = new Set();

  for (const col of currentBeams) {
    if (matrix[row][col] === "^") {
      const splitKey = `${row},${col}`;
      splits.add(splitKey);

      if (col > 0) {
        nextBeams.add(col - 1);
      }
      if (col < COLS - 1) {
        nextBeams.add(col + 1);
      }
    } else {
      nextBeams.add(col);
    }
  }

  activeBeams.set(row + 1, nextBeams);
}

console.log(splits.size);
