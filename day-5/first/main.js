const fs = require("fs");

let input = fs.readFileSync("../input.txt", "utf-8");
input = input.split("\n");

let result = 0;
const freshRanges = new Set();

let i = 0;
while (input[i] !== "") {
  freshRanges.add(input[i]);
  i++;
}

while (i < input.length) {
  const ingredient = Number(input[i]);
  for (const range of freshRanges) {
    const [start, end] = range.split("-").map(Number);
    if (ingredient >= start && ingredient <= end) {
      result++;
      break;
    }
  }
  i++;
}

console.log(result);
