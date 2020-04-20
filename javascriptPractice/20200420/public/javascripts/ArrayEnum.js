function setup()
{
    createCanvas(400,400);
    background(220);
    noFill();
    noLoop();
}
function draw()
{
    let x =100;
    let y =200;
    let radii = [62, 23, 41, 15, 30];
    let sum =0;
    for(let value of radii)
    {
        sum=sum+value;
    }
    let avg =sum/radii.length;
    ellipse(x,y,avg);
    fill(0,0,0);
    text(avg,x,y);
    // for (let value of radii)
    // {
    //
    //     if(value%2!=0)//奇數畫圓
    //     {
    //         ellipse(x,y,value);
    //         x=x+50;
    //     }
    // }
}