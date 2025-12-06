const fs = require("fs");

let input = fs.readFileSync("../input.txt", "utf-8");
input = input.split("\n");

const columns = [];
for (let row = 0; row < input.length; row++) {
  const line = input[row];
  let columnIndex = 0;
  let i = 0;
  while (i < line.length) {
    if (line[i] === " ") {
      i++;
      continue;
    }
    if (!columns[columnIndex]) {
      columns[columnIndex] = [];
    }

    let num = "";
    while (line[i] !== " " && i < line.length) {
      num += line[i];
      i++;
    }
    columns[columnIndex].push(num);
    i++;
    columnIndex++;
  }
}

let total = 0;
for (let col = 0; col < columns.length; col++) {
  const column = columns[col];
  const operator = column[column.length - 1];

  let result;
  if (operator === "+") {
    result = column.slice(0, -1).reduce((sum, num) => sum + Number(num), 0);
  } else {
    result = column.slice(0, -1).reduce((prod, num) => prod * Number(num), 1);
  }
  total += result;
}

console.log(total);
