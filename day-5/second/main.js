const fs = require("fs");

let input = fs.readFileSync("../input.txt", "utf-8");
input = input.split("\n");

const ranges = [];
let i = 0;
while (input[i] !== "") {
  const [start, end] = input[i].split("-").map(Number);
  ranges.push([start, end]);
  i++;
}

ranges.sort((a, b) => a[0] - b[0]);

const merged = [];
for (const [start, end] of ranges) {
  if (merged.length === 0) {
    merged.push([start, end]);
  } else {
    const last = merged[merged.length - 1];
    if (start <= last[1]) {
      last[1] = Math.max(last[1], end);
    } else {
      merged.push([start, end]);
    }
  }
}

let total = 0;
for (const [start, end] of merged) {
  total += end - start + 1;
}

console.log(total);
