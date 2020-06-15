let bg;
let sup01;
let sup02;
let sup03;
let sup04;

let btn01;
let btn02;
let btn03;
let btn04;

function preload() {
    sup01 = loadImage('images/suprt_1.png');
    sup02 = loadImage('images/suprt_2.png');
    sup03 = loadImage('images/suprt_3.png');
    sup04 = loadImage('images/suprt_4.png');

    btn01 = createImg('images/suprt_bt.png');
    btn02 = createImg('images/suprt_bt.png');
    // btn03 = createImg('images/suprt_bt.png');
    // btn04 = createImg('images/suprt_bt.png');

}


function setup(){
    let canvas = createCanvas(windowWidth, (windowWidth*0.5625));
    bg = loadImage('images/bg_start.jpg');
    bg.resize(windowWidth, (windowWidth*0.5625));
    canvas.parent('jumbo-canvas');


}


function draw() {
    background(bg);
    let imgScale = windowWidth/1920;

    //imageMode(CENTER);
    image(sup01, 1920/7*imgScale,1080/1.8*imgScale,sup01.width*imgScale,sup01.height*imgScale);
    image(sup02, 1920/3.1*imgScale,1080/1.8*imgScale,sup01.width*imgScale,sup01.height*imgScale);
    image(sup03, 1920/2*imgScale,1080/1.8*imgScale,sup01.width*imgScale,sup01.height*imgScale);
    image(sup04, 1920/1.47*imgScale,1080/1.8*imgScale,sup01.width*imgScale,sup01.height*imgScale);

    // image(sup01, 1920/7*imgScale,1080/1.8*imgScale,sup01.width*imgScale,sup01.height*imgScale);
    // image(sup02, 1920/3.1*imgScale,1080/1.8*imgScale,sup01.width*imgScale,sup01.height*imgScale);
    // image(sup03, 1920/2*imgScale,1080/1.8*imgScale,sup01.width*imgScale,sup01.height*imgScale);
    // image(sup04, 1920/1.47*imgScale,1080/1.8*imgScale,sup01.width*imgScale,sup01.height*imgScale);

    //-------------btn----------------
    btn01.position(1920/7*imgScale,1080/1.15*imgScale);
    btn01.mousePressed(changeSupImg);
    btn02.position(1920/3.1*imgScale,1080/1.15*imgScale);
    btn02.mousePressed(changeSupImg2);

}



function windowResized() {
    resizeCanvas(windowWidth, (windowWidth*0.5625)); //因為1920*1080比例 windowHeight
}

function changeSupImg() {
    sup01 = loadImage('images/suprt_1_d.png');
}
function changeSupImg2() {
    sup02 = loadImage('images/suprt_1_d.png');
}