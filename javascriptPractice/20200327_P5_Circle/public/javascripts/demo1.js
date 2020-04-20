function setup()
{
    //window.location.assign('test.html');
    createCanvas(640,480);
    noLoop();
}

let radius = 100;
const PI=3.1416;
//let words =["a","b","c"];
//let words2 =[10];
/*let  xPoints =[10];
for(let i=0;i<3;i++)
{

}*/

// let p0 = {x:100,y:100};
// let p1 = {x: 150, y: 100};
// let p2 = {x: 200, y: 100};
// let p3 = {x: 250, y: 100};
// let vectors = [p0,p1,p2,p3];
// let vectors = [{x:100,y:100},p1,p2,p3];
let vectors = [{x: 100, y: 100}, {x: 150, y: 100}, {x: 200, y: 100}, {x: 250, y: 100}];


function draw()
{
    // circle(100,150,radius);
    // circle(150,150,radius);
    // circle(200,150,radius);
    // circle(p0.x, p0.y, 60);
    // circle(p1.x, p1.y, 60);
    // circle(p2.x, p2.y, 60);
    // circle(p3.x, p3.y, 60);
    circle(vectors[0].x, vectors[0].y, 60);
    circle(vectors[1].x, vectors[1].y, 60);
    circle(vectors[2].x, vectors[2].y, 60);
    circle(vectors[3].x, vectors[3].y, 60);

}