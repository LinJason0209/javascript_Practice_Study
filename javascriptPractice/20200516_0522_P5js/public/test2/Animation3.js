///////物件跟隨

let pie;
let sprite;

function preload() {
    pie = loadAnimation('../assets/asterisk_circle0006.png', '../assets/asterisk_circle0008.png');
    sprite = createSprite(50, 100);
    sprite.addAnimation('pie', pie);
}

function setup() {
    createCanvas(400, 480);
    sprite.setVelocity(1, -1);
}

function draw() {
    background('lightgray');

    sprite.attractionPoint(0.5, 150, 150);

    drawSprites();
}