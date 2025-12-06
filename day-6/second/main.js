const fs = require("fs");

let input = fs.readFileSync("../input.txt", "utf-8");
input = input.split("\n");

const operatorIdxs = [];
for (let i = 0; i < input[input.length - 1].length; i++) {
  if (input[input.length - 1][i] === "+" || input[input.length - 1][i] === "*") {
    operatorIdxs.push(i);
  }
}

const columns = [];
for (let opIdx = 0; opIdx < operatorIdxs.length; opIdx++) {
  const column = [];
  const endIdx =
    opIdx === operatorIdxs.length - 1
      ? input[input.length - 1].length
      : operatorIdxs[opIdx + 1] - 1;
  for (let row = 0; row < input.length - 1; row++) {
    column.push(input[row].slice(operatorIdxs[opIdx], endIdx));
  }
  columns.push(column);
}

let total = 0;
for (let col = 0; col < columns.length; col++) {
  const column = columns[col];
  const operator = input[input.length - 1][operatorIdxs[col]];

  const rightToLeftNumbers = [];
  for (let i = 0; i < column[0].length; i++) {
    let num = "";
    for (let j = 0; j < column.length; j++) {
      num += column[j][i];
    }
    rightToLeftNumbers.push(Number(num));
  }

  let result;
  if (operator === "+") {
    result = rightToLeftNumbers.reduce((sum, num) => sum + Number(num), 0);
  } else {
    result = rightToLeftNumbers.reduce((prod, num) => prod * Number(num), 1);
  }
  total += result;
}

console.log(total);
