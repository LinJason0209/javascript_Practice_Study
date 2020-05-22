////////////overlay
let box;
let tank;

function preload() {
    box = createSprite(200, 200);
    box.addImage('rigid', loadImage('../assets/box0001.png'));
    tank = createSprite(200, 200);
    tank.addImage('tank', loadImage('../assets/tank.png'));
    tank.addImage('explode', loadImage('../assets/explode.png'));

}

function setup() {
    createCanvas(800, 480);
    tank.scale = 0.25;
}

function draw() {
    background(255, 255, 255);
    tank.position.x = mouseX;
    tank.position.y = mouseY;
    if (tank.overlap(box)) {
        tank.changeImage('explode');
    } else {
        tank.changeImage('tank');
    }

    drawSprites();
}
