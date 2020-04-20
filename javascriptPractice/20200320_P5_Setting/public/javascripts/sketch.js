let r=50;
function setup()
{
    createCanvas(400,400);
    noLoop;
    //console.log("a");
}
function draw()
{
    background(220,220,220);

    noFill();
    let x =200;
    let y =200;
    /*for(let i=0;i<4;i++)
    {
        ellipse(x,y,r);
        r=r+20;
    }*/
    ellipse(x,y,r);
    ellipse(x,y,r+20);
    ellipse(x,y,r+20+20);
    ellipse(x,y,r+20+20+20);

}