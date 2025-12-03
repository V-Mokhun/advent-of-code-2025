const fs = require("fs");

let input = fs.readFileSync("../input.txt", "utf-8");
input = input.split("\n");
const NUM_DIGITS = 12;

let result = BigInt(0);

for (let i = 0; i < input.length; i++) {
  const line = input[i];
  const digits = [];

  for (let j = 0; j < NUM_DIGITS; j++) {
    let ptr = j === 0 ? 0 : digits[j - 1].index + 1;
    let resultPtr = ptr;
    let digit = Number(line[ptr]);

    while (ptr < line.length - (NUM_DIGITS - j - 1)) {
      if (Number(line[ptr]) > digit) {
        resultPtr = ptr;
        digit = Number(line[ptr]);
      }
      ptr++;
    }

    digits.push({ index: resultPtr, digit });
  }

  result += BigInt(digits.reduce((acc, curr) => acc + curr.digit, ""));
}

console.log("Result: ", result);
