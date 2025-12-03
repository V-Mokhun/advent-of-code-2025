const fs = require("fs");

let input = fs.readFileSync("../input.txt", "utf-8");
input = input.split("\n");

let result = 0;

for (let i = 0; i < input.length; i++) {
  const line = input[i];
  let leftPtr = 0;
  let rightPtr = 1;
  let leftDigit = Number(line[leftPtr]);
  let rightDigit = Number(line[rightPtr]);

  while (rightPtr < line.length) {
    if (Number(line[rightPtr]) > leftDigit) {
      if (rightPtr < line.length - 1) {
        leftPtr = rightPtr;
        leftDigit = Number(line[leftPtr]);
        rightPtr++;
        rightDigit = Number(line[rightPtr]);
      } else {
        rightDigit = Number(line[rightPtr]);
        rightPtr++;
      }

      continue;
    }

    if (Number(line[rightPtr] > rightDigit)) {
      rightDigit = Number(line[rightPtr]);
    }

    rightPtr++;
  }

  result += leftDigit * 10 + rightDigit;
}

console.log("Result: ", result);
