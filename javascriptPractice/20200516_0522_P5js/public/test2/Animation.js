let ghost;
let ghostAnim;//創建動畫
let ghostSprite;//創建Sprite
function preload() {
    ghostSprite = createSprite();
    // ghost = loadAnimation('../assets/ghost_standing0001.png',
    //     '../assets/ghost_standing0007.png');
    ghostAnim = loadAnimation('../assets/ghost_standing0001.png',
        '../assets/ghost_standing0007.png');//匯入動畫圖片
    ghostSprite.addAnimation("ghost",ghostAnim);//建立動畫
}
function setup() {
    createCanvas(400, 480);
    ghostSprite.setVelocity(1,1);//設定向量方向
}
let x=0;
let r=0;
function draw() {
    background('gray');
    //if(x>width) x=0;
    //animation(ghost, x+=1, 100);
    drawSprites();//將Sprite的部份畫出來
}