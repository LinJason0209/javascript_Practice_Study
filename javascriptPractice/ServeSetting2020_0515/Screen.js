let x = 10;//預設圓的訊息
let y = 10;
let r = 5;
let c = "#000000";
console.log("Sent");
function setup() {
    createCanvas(400,400);//給予畫面畫布
    io().on("Screen",function (message) {//接收來自Server.js的emit資料
        console.log("Screen.js"+message);
        x = message.x;//更改預設為client端數值
        y = message.y;
        r = message.r;
        c = message.c;
    });
}

function draw() {
    stroke(c);//填滿顏色
    ellipse(x,y,r);//畫出圓形
}