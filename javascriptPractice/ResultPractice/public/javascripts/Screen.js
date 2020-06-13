
let cnvC;//畫布建置
let cnvR;//右側畫布，呈現line對話框
let cnvL;//左側遊戲畫布
let gameScreen =0;//畫面呈現 0為初始確認畫面，1為遊戲中畫面，2結束遊戲畫面
let birth = "2012,12,21";//體驗者生日
let name = "HHH";//體驗者名稱
let today = getToday();//取得今日時間
let gameCondition = false;//確認遊戲是否結束
let timer = 0;//預設關卡時間

let messageLoadImg = [];//line對話內容圖預載區
let messageImg = [];//line對話內容圖
let upMove = 90;//message上升位移
let upSpeed = 1;//上升速度，2為兩秒更新一次

let labelLoadImg = [];//分頁內容圖預載區
let labelImg = [];//分頁內容圖
let rightMove = 140;//分頁新增位移
let rightSpeed = 2;//右移速度，2為兩秒更新一次

///////////////////////////////////設置場景//////////////////
class stage{//設置場景模板
    constructor(ID,goalImg,timer,rightSpeed,upSpeed) {
        this.ID = ID;//關卡索引
        this.goalImg = goalImg;//目標圖案
        this.timer = timer;//關卡可用時間
        this.rightSpeed = rightSpeed;
        this.upSpeed = upSpeed;
    }
}
class messageData{//設置對話框模板
    constructor(index,y,w,h) {
        this.x = 0;//0/130
        this.y = y;
        this.w = w;
        this.h = h;
        this.index = index;
    }
    move()
    {
        this.y -= upMove;//向上移動
    }
    random()
    {
        let index = Math.floor(Math.random()*3)+1;//會回傳之間的隨機數字，*x)+y的意思為y~x的值
        return index;
    }
    display()//對話框產生機        setMessage(0, 0, 170,70);//產生對話框
    {
        if(this.index===2)
        {
            this.x =130;
        }
        else
        {
            this.x =0;
        }
        cnvR.image(messageLoadImg[this.index],this.x,this.y,this.w,this.h);
    }
}
let setMessage = new messageData();//待產生message
let setMessage_1 = new messageData(1,320, 170,70);//預設message
messageImg = [setMessage_1];//對話訊息庫

class labelData{ //設置分頁框模板
    constructor(index,x,w,h) {
        this.x = x;//0/130
        this.y = 0;
        this.w = w;
        this.h = h;
        this.index = index;
    }
    move()
    {
        if(labelImg.length<=8)
        {
            this.x += rightMove;//向右移動
             // this.x += 1;//向右移動
        }
        else if(labelImg.length<=15)
        {
            this.x += rightMove/2;//向右移動
        }
        else if(labelImg.length>20)
        {
            this.x += rightMove/3;//向右移動
        }
    }
    display()//分頁框產生機
    {
         cnvL.image(labelLoadImg[this.index],this.x,this.y,this.w,this.h);
    }
}
let setLabel = new labelData();//待產生分頁
let setLabel_1 = new labelData(1,200, 150,35);//預設分頁
labelImg = [setLabel_1];//分頁庫
///////////////////////////////////設置場景//////////////////
///////////////////////////////////設置關卡//////////////////
class chapter{//設置關卡模板
    constructor(ID,goalImg,time) {
        this.ID = ID;//關卡索引
        this.goalImg = goalImg;//目標圖案
        this.time = time;//關卡可用時間
    }
}
let chapterFirst = new chapter(1,"",10);//第一關
let chapterSecond = new chapter(2,"",20);//第二關
let chapters = [chapterFirst,chapterSecond];//關卡庫
let chapterEndCount = chapters.length;//關卡總數
let chapterCount = 0;//當前關卡
///////////////////////////////////設置關卡//////////////////
///////////////////////////////////資訊初始化//////////////////
class ScreenData{
    constructor(name,birth) {
        this.joinName = name;
        this.joinBirth = birth;
    }
}
let joinData = new ScreenData();
io().on("Set",function (ClientIP,saveBase,catchIndex,QuestDataBase,AnswerDataBase,EffectDataBase) {
    joinData.joinName = catchJoinName(saveBase);
    joinData.joinBirth = saveBase.JoinUserBirth;
    console.log("birth: "+joinData.joinBirth);
    birth = joinData.joinBirth.toString();//體驗者生日
    birth = birth.replace("-",", ");
    birth = birth.replace("-",", ");
    name = joinData.joinName;//體驗者名稱
});
///////////////////////////////////資訊初始化//////////////////
///////////////////////////////////畫面初始化//////////////////
function centerCanvas() {//畫布置中
    let x = (windowWidth - width) / 2;
    let y = (windowHeight - height) / 2;
    cnvC.position(x,y);//console報錯的原因為需要p5js.dom函式庫，解法為換成最新版p5js.main
}
function windowResized() {//確保畫布畫面正常
    centerCanvas();
}
function canvasC() {//底層畫布
    centerCanvas();
    cnvC.background(220);
}
function drawCnvL() {//line對話畫面畫布
    cnvL.background(100);
    cnvL.noStroke();
    //cnvL.ellipse(cnvR.width / 2, cnvR.height / 2, 50, 50);
    // fill(92,167,182);//R,G,B,[A]
    // noStroke();
    // rectMode(CENTER);
    // cnvL.rect(cnvL.width/2, cnvL.height/2, 200,60,5);

    //labelImg[0].display();//測試用，估算位置
    for(let i=0;i<labelImg.length;i++)
    {
        labelImg[i].display();
        if(timer%rightSpeed ===0 && frameCount%60===0)
        {
                labelImg[i].move();
        }
        // if(labelImg[i].x<=labelImg[i].x+rightMove)
        // {
        //         labelImg[i].move();
        // }
    }
    if(timer%rightSpeed ===0 && frameCount%60===0)
    {
        let index = labelRandom();
        labelImg[labelImg.length] = setLabel = new labelData(index,200, 150,35);
    }
}
function drawCnvR() {//遊戲畫面畫布
    cnvR.background(255, 100, 255);
    // cnvR.fill(0, 0, 0);
    // cnvR.textSize(32);
    // cnvR.text("This is LINE!", 50, 50);
  // cnvR.image(messageImg[1],0,0,170,70);
    for(let i=0;i<messageImg.length;i++)
    {
        messageImg[i].display();
        if(timer%upSpeed ===0 && frameCount%60===0)//每2秒向上移動
        {
            messageImg[i].move();
        }
    }
    if(timer%upSpeed ===0 && frameCount%60===0)//每2秒新增一個訊息
    {
        let index = messageRandom();
        messageImg[messageImg.length] = setMessage = new messageData(index,320, 170,70);
    }
}

///////////////////////////////////畫面初始化//////////////////
///////////////////////////////////主程式/////////////////////
function preload() {//載入圖片進緩衝區
    for (let i =1;i<4;i++)//載入對話圖
    {
        let message = "images/message_"+i+".png";
        messageLoadImg[i] = loadImage(message);
    }
    for (let i=1;i<2;i++)//載入分頁圖
    {
        let label = "images/game_label_"+i+".png";
        labelLoadImg[i] = loadImage(label);
    }
}
function setup() {
    cnvC  = createCanvas(1200,600);//畫布大小
    cnvR  = createGraphics(300, 400);
    cnvL  = createGraphics(1200, 600);
    canvasC();
    timer =  chapters[chapterCount].time;//初始化關卡時間
    console.log("time: "+timer);
    console.log("chapterCount"+chapterCount);
    console.log("chapterEndCount"+chapterEndCount);
}
function draw() {
    if(gameScreen===0)//依照gameScreen選擇目前呈現的畫面
    {
        initScreen();
    }
    else if(gameScreen===1)
    {
        playScreen();
    }
    else if(gameScreen===2)
    {
        gameOverScreen();
    }
}
///////////////////////////////主程式//////////////////
function initScreen() {//初始確認畫面
    background(220);
    textAlign(CENTER);                 //文本置中
    fill(52, 73, 94);                  //文本顏色
    textSize(70);                     //文字大小
    text("救贖之路", width/2, height/2);

    fill(92,167,182);//R,G,B,[A]
    noStroke();
    rectMode(CENTER);
    rect(width/2, height-210, 200,60,5);
    fill(236,240,241);
    textSize(30);
    text("START", width/2, height-200);
}
function playScreen() {//遊戲中畫面

    drawCnvL();
    drawCnvR();
    image(cnvL, 0, 0);
    image(cnvR, 900, 100);//繪圖在底層畫布位置

    timer = countDownTimer(timer);//倒數計時
    fill(236,240,241);
    textSize(30);
    text(timer, width/2, height-500);//布置計時器

    if(gameCondition)//當遊戲確認結束時呈現結束畫面
    {
        gameScreen = 2;
    }
}
function gameOverScreen() {//結束畫面
    background(0);
    textAlign(CENTER);
    fill(255,255,255);
    textSize(60);
    text(name,width/2,height/2-80);

    textAlign(CENTER);
    fill(255,255,255);
    textSize(50);
    text(birth+" ~ "+today,width/2, height/2);

    // fill(109, 101, 115);//R,G,B,[A]
    // noStroke();
    // rectMode(CENTER);
    // rect(width/2, height-230, 150,45,5);
    fill(236,240,241);
    textSize(15);
    text(".請點擊螢幕繼續.", width/2, height-70);
}
function mouseClicked() {//滑鼠事件
    if(gameScreen===0)
    {
        playScreen();
        gameScreen = 1;
        // gameOverScreen();
        // gameScreen = 2;
    }
    else if(gameScreen===1)
    {

    }
    else if(gameScreen===2)
    {
        // if(gameCondition === false)
        // {
            location.href="index.html";
        // }
    }
}
function getToday() {//取得今日時間
    let date = new Date();
    let current = date.getFullYear()+", "+(date.getMonth()+1)+","+date.getDate();//+", "+date.getHours()+" : "+date.getMinutes()
    return current;
}
function messageRandom() {//亂數取訊息
    let index = Math.floor(Math.random()*3)+1;//會回傳之間的隨機數字，*x)+y的意思為y~x的值
    return index;
}
function labelRandom() {//亂數取分頁
    let index = Math.floor(Math.random()*1)+1;//會回傳之間的隨機數字，*x)+y的意思為y~x的值
    return index;
}