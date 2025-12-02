const fs = require("fs");

let input = fs.readFileSync("../input.txt", "utf-8");
input = input.split(",");

let result = 0;

for (let i = 0; i < input.length; i++) {
  const range = input[i].split("-");
  const [start, end] = range.map(Number);

  for (let j = start; j <= end; j++) {
    const half = j
      .toString()
      .split("")
      .slice(0, Math.floor(String(j).length / 2));
    const otherHalf = j
      .toString()
      .split("")
      .slice(Math.floor(String(j).length / 2));

    if (half.length !== otherHalf.length) {
      continue;
    }

    if (half.every((digit, idx) => digit === otherHalf[idx])) {
      result += j;
    }
  }
}

console.log("Result: ", result);
