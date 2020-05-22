//////滑鼠控制物件
let ghostAnimation;
let ghostSprite;

function preload() {
    ghostSprite = createSprite(100, 100);
    ghostAnimation = loadAnimation('../assets/ghost_standing0001.png',
        '../assets/ghost_standing0007.png');
    ghostSprite.addAnimation('ghost', ghostAnimation);
}

function setup() {
    createCanvas(400, 480);
}

function draw() {
    background('gray');
    drawSprites();
}

function mousePressed() {
    ghostSprite.scale = 0.25;
}

function mouseReleased() {
    ghostSprite.scale = 1;
}