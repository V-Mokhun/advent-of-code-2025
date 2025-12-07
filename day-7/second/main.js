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

const dp = new Map();
dp.set(0, new Map());
dp.get(0).set(startCol, 1);

for (let row = 0; row < ROWS; row++) {
  const currentRow = dp.get(row);
  dp.set(row + 1, new Map());

  const nextRow = dp.get(row + 1);

  for (const [col, pathCount] of currentRow.entries()) {
    if (matrix[row][col] === "^") {
      if (col > 0) {
        nextRow.set(col - 1, (nextRow.get(col - 1) || 0) + pathCount);
      }
      if (col < COLS - 1) {
        nextRow.set(col + 1, (nextRow.get(col + 1) || 0) + pathCount);
      }
    } else {
      nextRow.set(col, (nextRow.get(col) || 0) + pathCount);
    }
  }
}

const finalRow = dp.get(ROWS - 1);
const result = finalRow.values().reduce((sum, pathCount) => sum + pathCount, 0);
console.log(result);
