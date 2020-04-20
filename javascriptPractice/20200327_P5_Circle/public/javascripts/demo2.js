function setup() {
    createCanvas(400, 300);
    noLoop();
}

function draw() {
let result = Math.round(Math.random()*100000)%255;
console.log(result);
let p1={a:"a"};
let p2={a:"a"};
console.log(p1==p2)
}
