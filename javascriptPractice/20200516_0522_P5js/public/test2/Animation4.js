/////////////使用KeyCode鍵盤控制物件，

let pie;
let sprite;

function preload() {
    pie = loadAnimation('../assets/asterisk_circle0006.png', '../assets/asterisk_circle0008.png');
    sprite = createSprite(50, 100);//設置Sprite位置
    sprite.addAnimation('pie', pie);
}

function setup() {
    createCanvas(400, 480);
}

function draw() {
    background('lightgray');

    if (keyIsDown(LEFT_ARROW)) {   // left
        sprite.setVelocity(-2, 0);
    } else if (keyIsDown(RIGHT_ARROW)) {
        sprite.setVelocity(2, 0);
    } else if (keyIsDown(UP_ARROW)) {
        sprite.setVelocity(0, -2);
    } else if (keyIsDown(DOWN_ARROW)) {
        sprite.setVelocity(0, 2);
    } else if (keyWentDown(32)){///按下Space射子彈
        let s = createSprite(sprite.position.x,sprite.position.y,10,10)
        s.setVelocity(3,0);
        s.life = 70;
    }
    else {            // no key press -> stand still
        sprite.setVelocity(0, 0);
    }

    drawSprites();
}