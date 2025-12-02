const fs = require("fs");

let input = fs.readFileSync("../input.txt", "utf-8");
input = input.split(",");

let result = 0;

for (let i = 0; i < input.length; i++) {
  const range = input[i].split("-");
  const [start, end] = range.map(Number);

  const found = new Set();
  for (let j = start; j <= end; j++) {
    for (let k = 1; k <= Math.floor(String(j).length / 2); k++) {
      const beginning = String(j).slice(0, k);
      const isRepeated = beginning.repeat(String(j).length / k) === String(j);
      if (isRepeated && !found.has(j)) {
        result += j;
        found.add(j);
      }
    }
  }
}

console.log("Result: ", result);
