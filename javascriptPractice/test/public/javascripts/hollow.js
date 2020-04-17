//console.log("Hollow");

let r =100;
function setup()
{
    createCanvas(800,600,WEBGL);
    noLoop();
}
function draw()
{
  //console.log("0");
    /*background(210,2222,100);
    //noFill();
    strokeWeight(4);
    stroke('blue');
    fill(216, 65, 65,200);
    rect(200,150,300,300);
    noStroke();
    fill(52,235,58,200);
    rect(250,200,300,300);*/
    //modle();
    //Sum();

    Circle();

   // console.log("0");


}
function modle ()
{
    background(218,247,166);
    fill(216, 65, 65,200);
    rotateX(10+frameCount*0.1);
    rotateY(10+frameCount*0.1);
    box(100);
}

function Sum ()
{
let a=2;
let b=3;
let Sum=0;
sum=a+b;
console.log(sum);
}

function Circle()
{
    Circle(100,150,r);
    Circle(150,150,r);
    Circle(200,150,r);
}