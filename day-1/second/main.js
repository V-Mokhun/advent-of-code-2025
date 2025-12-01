const fs = require("fs");

let input = fs.readFileSync("../input.txt", "utf-8");
input = input.split("\n");

let zerosCount = 0;
let startPoint = 50;

for (let i = 0; i < input.length; i++) {
  const line = input[i];
  let [direction, ...steps] = line.split("");
  steps = Number(steps.join(""));
  if (direction === "L") {
    startPoint -= steps;

    while (startPoint < 0) {
      startPoint += 100;
      zerosCount++;
    }
  } else {
    startPoint += steps;

    while (startPoint >= 100) {
      startPoint -= 100;
      zerosCount++;
    }
  }
}

console.log("Result: ", zerosCount);
