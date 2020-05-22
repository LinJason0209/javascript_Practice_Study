////width，抓畫布寬度

let tankImage;
function preload()
{
    tankImage = loadImage("../assets/tank.png");//////////第一種匯入作法
    tankImage2 = loadImage("../assets/tank.png");
}
function setup() {
    createCanvas(400, 480);
    imageMode(CORNER);
    tankImage.width = tankImage.width*0.25;//縮小
    tankImage.hight = tankImage.hight*0.25;//縮小
    image(tankImage,0,0);//設定放置的位置
    ////////第二種匯入做法
    // loadImage("../assets/tank.png",function (img) {
    //     imageMode(CORNER);
    //     image(img,0,0);
    // });//../為此位置的上一層。imageMode()中CENTER為軸心在圖中心，CORNER為左上角為軸心，CORNERS為可設定
}

function draw() {
    background("Lightgreen");//重劃背景可刷新!! 要在畫圖之前
    tankDraw();

}
let x=0;
function tankDraw() {
    image(tankImage,x+=1,0);
}
