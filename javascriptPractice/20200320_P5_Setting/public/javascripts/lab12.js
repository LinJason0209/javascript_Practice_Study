let w = 600;
let h = 220;
function setup() {
    createCanvas(w, h);
    noLoop();
}

function draw() {
    background(204);// 設定背景為灰色
    line(0, 0, w, h); //由 (0, 0)畫到(w, h)
    line(w, 0, 0, h); //由(w, 0)畫到(0, h)
    circle(w / 2, h / 2, 60, 60); //畫圓,圓心為(w/2, h/2)
}
