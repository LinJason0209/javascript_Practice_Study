///////滑鼠事件按下後改圖
let s;

function preload() {
    s = createSprite(200, 200);
    s.addImage('i1', loadImage('../assets/asterisk_circle0000.png'));
    s.addImage('i2', loadImage('../assets/asterisk_circle0001.png'));
    s.addImage('i3', loadImage('../assets/asterisk_circle0002.png'));
    s.addImage('i4', loadImage('../assets/asterisk_circle0003.png'));
    s.addImage('i5', loadImage('../assets/asterisk_circle0004.png'));
}

function setup() {
    createCanvas(800, 480);
}

function draw() {
    background(255, 255, 255);
    s.position.x = mouseX;
    s.position.y = mouseY;
    drawSprites();
}

let i = 0;

function mouseClicked() {
    i = i % 5 + 1;
    s.changeImage('i' + i);
}