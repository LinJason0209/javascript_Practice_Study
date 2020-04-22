

function setup()
{
    createCanvas(400,400);
    noLoop;
    //console.log("2");
}


function draw()
{
    // background(220,220,220);
    // noFill();
    // let r=50;
    // let x=200;
    // let y=200;
    // let count=0;
    //
    // for (let i=0;i<4;i++)
    // {
    //     ellipse(x,y,r);
    //     r=r+20;
    //     count++;
    // }
    /////while實作
    //console.log(count);
    // while (count<4)
    // {
    //     //console.log(count);
    //     ellipse(x,y,r);
    //     r=r+20;
    //     count++;
    // }
    ////測試p5 function
    //console.log("2");
   let circle = function (){
    background(220,220,220);
    noFill();
    let r=50;
    let x=200;
    let y=200;
    let count=0;
    //console.log(count);
    while (count<4)
    {
        //console.log(count);
        ellipse(x,y,r);
        r=r+20;
        count++;

    }

}
    circle();
}




// let r=50;
// function setup()
// {
//     createCanvas(400,400);
//     noLoop;
//     //console.log("a");
// }
// function draw()
// {
//     background(220,220,220);
//
//     noFill();
//     let x =200;
//     let y =200;
//     /*for(let i=0;i<4;i++)
//     {
//         ellipse(x,y,r);
//         r=r+20;
//     }*/
//     ellipse(x,y,r);
//     ellipse(x,y,r+20);
//     ellipse(x,y,r+20+20);
//     ellipse(x,y,r+20+20+20);
//
// }