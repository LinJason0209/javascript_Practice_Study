let circle = new Circle();//建立圓形物件
let p = new Polygon();//建立多邊形物件
let b =false;

function setup() {
    createCanvas(400, 480);
    background("gray");
    setCirclr();
    setPolgon();
    //noLoop();
}

function draw() {
    circlrMove(circle,b);
    pMove();
}
function circlrMove(circle) { 圓形動畫
    if(circle.x-circle.size/2>width)
    {
        circle.x=-100;
    }
    if(circle.size<=100 && b == false)
    {
        circle.size += 0.5;
        if(circle.size == 100)
        {
            b = true;
            console.log(b);
        }
    }
    if (b == true)
    {
        circle.size -= 0.5;
        if(circle.size == 50)
        {
            b =false
            console.log(b);
        }
    }
    circle.x+=0.5;
    circle.show();
}
function mousePressed() {//滑鼠事件(當滑鼠按下)
    circle.color = "Lightblue";
    p.sides+=1;
    p.color="red";
}
function  mouseReleased() {//滑鼠事件(當滑鼠移開)
    circle.color = "Lightgreen";
    p.color = "Lightblue";
}
function setCirclr() {//圓形初始化設定
    circle.x=100;
    circle.y=100;
    circle.size=50;
    circle.color = "Lightgreen";
}
function  setPolgon() {//多邊形初始化設定
    p.x=100;//X位置
    p.y=300;//Y位置
    p.size=55;//大小
    p.color="Lightblue";
    p.sides=7; //多邊形邊數
}
function pMove() {//多邊型動畫
    p.spin+=2;
    p.show();//確定呈現
}