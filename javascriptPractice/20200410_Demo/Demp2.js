let scores = [61, 57, 63, 53, 55, 54, 68, 50, 52, 54];

let count = 0;

for (let score of scores) {
    if (score < 60) continue;
    count++;
}

console.log(count);

let i=20;
let j=30;
let result=(i===j?"yes":"no");