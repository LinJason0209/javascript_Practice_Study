let circle = new Circle();
let p = new Polygon();
let b =false;

function setup() {
    createCanvas(400, 480);
    setCirclr();
    setPolgon();
    //noLoop();
}

function draw() {
    background("gray");
    circlrMove(circle,b);
    pMove();
}
function circlrMove(circle) {
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
function mousePressed() {
    circle.color = "Lightblue";
    p.sides+=1;
    p.color="red";
}
function  mouseReleased() {
    circle.color = "Lightgreen";
    p.color = "Lightblue";
}
function setCirclr() {
    circle.x=100;
    circle.y=100;
    circle.size=50;
    circle.color = "Lightgreen";
}
function  setPolgon() {
    p.x=100;
    p.y=300;
    p.size=55;
    p.color="Lightblue";
    p.sides=7;
}
function pMove() {
    p.spin+=2;
    p.show();
}