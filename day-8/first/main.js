const fs = require("fs");

let input = fs.readFileSync("../input.txt", "utf-8");
input = input.split("\n");

const boxes = input.map((line) => {
  const [x, y, z] = line.split(",").map(Number);
  return { x, y, z };
});

function distance(box1, box2) {
  const dx = box1.x - box2.x;
  const dy = box1.y - box2.y;
  const dz = box1.z - box2.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

const pairs = [];
for (let i = 0; i < boxes.length; i++) {
  for (let j = i + 1; j < boxes.length; j++) {
    pairs.push({
      box1: i,
      box2: j,
      distance: distance(boxes[i], boxes[j]),
    });
  }
}

pairs.sort((a, b) => a.distance - b.distance);

const circuits = boxes.map((_, i) => new Set([i]));

for (let i = 0; i < 1000; i++) {
  const pair = pairs[i];
  let circuit1 = null;
  let circuit2 = null;

  for (const circuit of circuits) {
    if (circuit.has(pair.box1)) {
      circuit1 = circuit;
    }
    if (circuit.has(pair.box2)) {
      circuit2 = circuit;
    }
  }

  if (circuit1 === circuit2) {
    continue;
  }

  for (const box of circuit2) {
    circuit1.add(box);
  }

  const index = circuits.indexOf(circuit2);
  circuits.splice(index, 1);
}

const sizes = circuits.map((circuit) => circuit.size).sort((a, b) => b - a);
const result = sizes[0] * sizes[1] * sizes[2];

console.log(result);
