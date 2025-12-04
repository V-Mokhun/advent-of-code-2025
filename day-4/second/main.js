const fs = require("fs");

let input = fs.readFileSync("../input.txt", "utf-8");
input = input.split("\n");

const matrix = input.map((line) => line.split(""));

let result = 0;
let rollsToBeRemoved = new Set();

const generateKey = (i, j) => `${i},${j}`;

do {
  rollsToBeRemoved.clear();

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] !== "@") continue;

      let adjacentCount = 0;
      const directions = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
      ];

      for (const [di, dj] of directions) {
        const ni = i + di;
        const nj = j + dj;

        if (ni >= 0 && ni < matrix.length && nj >= 0 && nj < matrix[ni].length) {
          if (matrix[ni][nj] === "@") {
            adjacentCount++;
          }
        }
      }

      if (adjacentCount < 4) {
        rollsToBeRemoved.add(generateKey(i, j));
        result++;
      }
    }
  }

  for (const key of rollsToBeRemoved) {
    const [i, j] = key.split(",").map(Number);
    matrix[i][j] = ".";
  }
} while (rollsToBeRemoved.size > 0);

console.log(result);
