
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
let upSpeed = 60;//預設上升速度，2為60fps更新一次 = 1秒更新一次

let labelLoadImg = [];//分頁內容圖預載區
let labelImg = [];//分頁內容圖
let rightMove = 140;//分頁新增位移
let rightSpeed = 60;//預設右移速度，60為60fps更新一次 = 1秒更新一次

let stageLoadImg = [];//場景圖預載區
let cardLoadImg = []; //卡片庫
let cardNormal;//卡片背面
let tempCheck = undefined;//暫存第一次翻排
let button;//------------------------------------------------------------------------------->

let rangeWidth = 400;//布局卡片區範圍
let rangeHeight = 500;//布局卡片區範圍
let startRange = [500,200];//布局卡片區起始範圍，左上
let endRange = [750,400];//布局卡片區結束範圍，右下

let bananaMassage=[];//香蕉說話圖預仔區
let alertLLoadSupport = [];//彈跳協助者成果視窗，共8張，2張一組，所以index為2在跳
// let kill;//測試刪除
// let index = 0;//欲刪除的label
///////////////////////////////////設置場景//////////////////
let alertMove = false;
let alert ;
let showLoad;
let show;
let showX = 1170;
let showY = -60;
let showList = [];
class alertImg{//協助者成果彈跳視窗
    constructor(src,img) {
        this.src = src;//圖片位置
        this.img = img;//存下圖片
    }
    display()
    {
        show = image(this.img,1170,40,400,400);
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
        this.y = 15;
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
        else if(labelImg.length<20)
        {
            this.x += rightMove/3;//向右移動
        }
        else
        {
            this.x += rightMove/4;//向右移動
        }
    }
    display()//分頁框產生機
    {
         // cnvL.image(labelLoadImg[this.index],this.x,this.y,this.w,this.h);
        image(labelLoadImg[this.index],this.x,this.y,this.w,this.h);
    }
}
let setLabel = new labelData();//待產生分頁
let setLabel_1 = new labelData(1,200, 150,35);//預設分頁
labelImg = [setLabel_1];//分頁庫
///////////////////////////////////設置場景//////////////////
///////////////////////////////////設置關卡//////////////////
class chapter{//設置關卡模板
    constructor(ID,goalImg,time,rightSpeed,upSpeed,cardCount) {
        this.ID = ID;//關卡索引
        this.goalImg = goalImg;//目標圖案
        this.time = time;//關卡可用時間
        this.rightSpeed = rightSpeed;//關卡預設分頁新增速度
        this.upSpeed = upSpeed;//關卡預設訊息新增速度
        this.cardwidth = rangeWidth/(Math.sqrt(cardCount));//關卡卡片寬，sqrt為取平方根
        this.cardHeight = rangeHeight/(Math.sqrt(cardCount));//關卡卡片長
        this.cardCount = cardCount;//關卡卡片數
        this.card = [];//放置預載卡片
        this.finishCount = cardCount-1;//關卡完成翻牌計數
    }
}
class cardData {//設置卡片模板
    constructor(ID,checkID,setSquare,width,Height,img) {
        this.ID = ID;//卡片序號，用來分辨卡片
        this.checkID = checkID;//確認是否同張，未使用
        this.cardCheck = false;//確認是否翻排
        this.setSquare =setSquare;//排卡片時設定，方陣數
        this.cardwidth = width;//排卡片時設定，長
        this.cardHeight = Height;//牌卡片時設定，高
        this.cardImg = img;
        this.cardShow = undefined;//呈現卡片用物件
        this.cardRow = 0;//卡片排版橫值
        this.cardCol = 0;//卡片排版直值
    }
    display()
    {
        if(this.cardCheck === false)
        {
            this.cardShow = createImg('images/card_b.png');
            this.cardShow.size(this.cardwidth,this.cardHeight);
            this.cardShow.position(startRange[0]+this.cardwidth*this.cardRow+50, startRange[1]+this.cardHeight*this.cardCol-70);//            this.cardShow.position(190+this.ID*100, 100);
        }
        else if(this.cardCheck === true)
        {
            this.cardShow = createImg(this.cardImg);
            this.cardShow.size(this.cardwidth,this.cardHeight);
            this.cardShow.position(startRange[0]+this.cardwidth*this.cardRow+50, startRange[1]+this.cardHeight*this.cardCol-70);//            this.cardShow.position(190+this.ID*100, 100);
        }
    }
}
/////////////////////////////////////////////設置關卡///////////
let chapterFirst = new chapter(1,"",10,60,30,9);//第一關
let chapterSecond = new chapter(2,"",20,30,15,16);//第二關


let chapters = [chapterFirst,chapterSecond];//關卡庫
let chapterEndCount = chapters.length;//關卡總數
let chapterCount = 0;//當前關卡///////////////新增關卡屬性值，需在index.js
///////////////////////////////////設置關卡//////////////////
///////////////////////////////////設置卡片//////////////////
let cards=[];
let loadIndex =0;
let cardCount;//用於奇偶換算
let cardCount_2;//用於判斷奇偶數

    for(let ichapterCount=1;ichapterCount<=chapters.length;ichapterCount++)//ichapterCount=1為第一關第一個判斷是否小於關卡總數
    {
        if(((chapters[ichapterCount-1].cardCount-1)/2)%2 !== 0)//將卡片種類值整數化
        {
            cardCount = ((chapters[ichapterCount-1].cardCount-1)/2)+0.5;
        }
        else {
            cardCount = ((chapters[ichapterCount-1].cardCount-1)/2);
        }

        if((chapters[ichapterCount-1].cardCount)%2!==0)//判斷關卡的卡片總數為奇或偶數
        {
            cardCount_2 = (chapters[ichapterCount-1].cardCount-1);//為奇數時
        }
        else
        {
            cardCount_2 = (chapters[ichapterCount-1].cardCount);//為偶數時
        }

        for(let i=0;i<chapters[ichapterCount-1].cardCount;i++)//將卡片物件放入陣列//ichapterCount-1為chapters中的第一關，第二個為判斷關卡中的卡片種類數for(let i=0;i<(chapters[ichapterCount-1].cardCount-1)/2;i++)
        {
            if(i>=(cardCount_2))
            {
                chapters[ichapterCount-1].card[i]= new cardData();
                chapters[ichapterCount-1].card[i].ID = null;
                chapters[ichapterCount-1].card[i].setSquare = Math.sqrt(chapters[ichapterCount-1].cardCount);
                chapters[ichapterCount-1].card[i].cardwidth = chapters[ichapterCount-1].cardwidth;
                chapters[ichapterCount-1].card[i].cardHeight = chapters[ichapterCount-1].cardHeight;
                chapters[ichapterCount-1].card[i].cardImg  ="images/card_f_"+(chapterCount+1)+"_n.png";
            }
            else
            {
                chapters[ichapterCount-1].card[i]= new cardData();
                chapters[ichapterCount-1].card[i].ID = loadIndex;
                chapters[ichapterCount-1].card[i].setSquare = Math.sqrt(chapters[ichapterCount-1].cardCount);
                chapters[ichapterCount-1].card[i].cardwidth = chapters[ichapterCount-1].cardwidth;
                chapters[ichapterCount-1].card[i].cardHeight = chapters[ichapterCount-1].cardHeight;
                chapters[ichapterCount-1].card[i].cardImg  = "images/card_f_"+(ichapterCount)+"_"+(loadIndex+1)+".png";
            }
           // console.log("sort: "+(cardCount-1));
            //console.log("index: "+i+"chapter: "+ichapterCount+"card: "+(loadIndex+1)+"ID: "+ chapters[ichapterCount-1].card[i].ID);
            if(loadIndex<cardCount-1)//成對卡牌的布置判定
            {
                loadIndex +=1;
            }
            else {
                loadIndex =0
            }
        }
        loadIndex =0;
        cards[ichapterCount] = chapters[ichapterCount-1].card;
         console.log("cardCount: "+(chapters[ichapterCount-1].cardCount-1)/2);

        let i=0;
        let count = chapters[ichapterCount-1].card[0].setSquare;
        for(let row = 0;row<count;row++)//為卡片制定排版用的值
        {
            // console.log(" ID: "+chapters[ichapterCount-1].card[i].ID+" i: "+i+" setSquare: "+chapters[ichapterCount-1].card[i].setSquare+" row: "+row);
            for(let col = 0;col<count;col++)//
            {
                //console.log(" setSquare: "+chapters[ichapterCount-1].card[i].setSquare);
                chapters[ichapterCount-1].card[i].cardRow = row;
                chapters[ichapterCount-1].card[i].cardCol = col;

                //console.log("Chapter: " + ichapterCount+" Row: "+chapters[ichapterCount-1].card[i].cardRow+" Col: "+chapters[ichapterCount-1].card[i].cardCol+" ID: "+chapters[ichapterCount-1].card[i].ID+" i: "+i);
                i++;
            }
        }
        // console.log(i);
        i=0;
    }

//console.log("cards: "+cards[1].length);
    for(let chapterCounti=0;chapterCounti<chapters.length;chapterCounti++)
    {
        for(let i=0;i<chapters[chapterCounti].cardCount;i++)
        {
            //console.log("img: "+chapters[chapterCounti].card[i].cardImg);
        }
    }

// cards[0] = new cardData();
// cards[0].ID = 0;
// cards[0].setSquare = Math.sqrt(chapters[chapterCount].cardCount);
// cards[0].cardwidth = chapters[chapterCount].cardwidth;
// cards[0].cardHeight = chapters[chapterCount].cardHeight;
cards[0]  = "images/card_f_"+(chapterCount+1)+"_n.png";//用來導亂的卡片

// for(let iR=0;iR<(Math.sqrt(chapters[chapterCount].cardCount));iR++)//橫排
// {
//     for(let iC=0;iC<(Math.sqrt(chapters[chapterCount].cardCount));iC++)//直排
//     {
//
//
//     }
// }
///////////////////////////////////設置卡片//////////////////
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
let supportResult;//協助者成果
let supportRole;
let supportIndex;
let supportLock = false;
io().on("SupportResult",function (clientUser,clientUserRole,result,effect,catchIndex)//result回傳boolen
{
    supportLock = true;
    console.log(result);
    supportRole = clientUserRole;
    if(supportRole ===0)
    {
        supportIndex = 0;
    }
    else if(supportRole ===1){
        supportIndex = 2;
    }
    else if(supportRole ===2){
        supportIndex = 4;
    }
    else if(supportRole ===3){
        supportIndex = 6;
    }
    if(result === true)
    {
        supportResult = 0;
        timer+=10;
    }
    else
    {
        timer-=10;
        supportResult = 1;
        supportIndex = supportIndex+1;
    }
    console.log("supportIndex: "+supportIndex+"clientUserRole"+clientUserRole);
    //  show = createImg("images/suprt_"+clientUserRole+"_"+result+".png");
    // show.size(200,200);
    // show.position(showX, showY);//1170, 40最終位置

    //alertMove = true;
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
    // cnvL.background(100);
    cnvL.background(stageLoadImg[3]);
    cnvL.image(stageLoadImg[2],0,70,350,450);//畫出此關卡目標圖案背景
    cnvL.image(chapters[chapterCount].goalImg,30,100,280,320);//畫出此關卡目標圖案
    cnvL.image(stageLoadImg[0],0,350,200,240);//畫出香蕉人
    cnvL.image(bananaMassage[chapterCount],150,450,160,80);//畫出香蕉人說話

    for(let row=0;row<cards[chapterCount+1].length;row++)
    {
        if(cards[chapterCount+1][row].cardShow === undefined)//卡片產生//此處判定是否有產生過牌，若有就忽視以避免重複畫圖造成的資源耗損
        {
            cards[chapterCount+1][row].display();
            cards[chapterCount+1][row].cardShow.mousePressed(function () {change(chapterCount+1,row,cards[chapterCount+1][row].ID)});//監聽事件，設置好就會一直監聽，雙的function設計是為了可以傳參數
        }
    }
    let changeLock = false;//避免未處理完又再翻牌
    function change(cardCount,row,ID) {//翻牌
        if(changeLock === false)
        {
            changeLock=true;
            if(tempCheck === undefined)//如果沒翻過牌
            {
                tempCheck =  [ID,cardCount,row];//存下第一雌翻牌的物件
                cards[cardCount][row].cardShow.remove();//刪除原來的圖
                cards[cardCount][row].cardShow = undefined;//根除原來的圖的物件
                cards[cardCount][row].cardCheck = true;//確認翻牌(節約資源用)
                cards[cardCount][row].display();//產生翻面
                changeLock=false;
            }
            else
            {
                cards[cardCount][row].cardShow.remove();//刪除原來的圖
                cards[cardCount][row].cardShow = undefined;//根除原來的圖的物件
                cards[cardCount][row].cardCheck = true;//確認翻牌(節約資源用)
                cards[cardCount][row].display();//產生翻面
                setTimeout(function () {checkSame(cardCount,row)},500);//延遲執行
            }

        }
    }
    function checkSame(cardCount,row) {
        //console.log("tempCheck.ID: "+tempCheck[0]);
        //console.log("card.ID: "+cards[cardCount][row].ID);
        if(cards[cardCount][row].ID === tempCheck[0])//對照是否相同ID
        {
            cards[cardCount][row].cardShow.remove();//刪除第二次翻面的物件原來的圖
            cards[tempCheck[1]][tempCheck[2]].cardShow.remove();//刪除第一次翻面的物件原來的圖
            //cards[cardCount][row].cardShow = undefined;//根除原來的圖的物件
            tempCheck = undefined;//根除暫存區的物件
            if(chapters[chapterCount].finishCount>0)
            {
                // tint(255, 255/(chapters[chapterCount].finishCount/2));//225為0%透明，0為100%透明
                // cnvL.image(chapters[chapterCount].goalImg,30,100,280,320);//畫出此關卡目標圖案
                chapters[chapterCount].finishCount -= 2;//增加成功刪除的卡片數
                //console.log(".finishCount: "+chapters[chapterCount].finishCount);
                if(chapters[chapterCount].finishCount<=0)
                {
                    for(let row=0;row<cards[chapterCount+1].length;row++)
                    {
                        if(cards[chapterCount+1][row].cardShow!==undefined)
                        {
                            cards[chapterCount+1][row].cardShow.remove();
                            cards[chapterCount+1][row].cardShow = undefined;
                        }
                    }
                    chapterCount+=1;//下一關
                    //gameScreen = 0;
                    if(chapterCount+1<=chapterEndCount)
                    {
                        timer = chapters[chapterCount].time;
                        rightSpeed = chapters[chapterCount].rightSpeed;
                        upSpeed = chapters[chapterCount].upSpeed;
                    }
                }
            }
            else if(chapters[chapterCount].finishCount<=0)
            {
                chapterCount+=1;//下一關
                gameScreen = 0;
            }
        }
        else
        {
            cards[cardCount][row].cardShow.remove();//刪除第二次翻面的物件原來的圖
            cards[tempCheck[1]][tempCheck[2]].cardShow.remove();//刪除第一次翻面的物件原來的圖
            cards[cardCount][row].cardShow = undefined;//根除原來的圖的物件
            cards[tempCheck[1]][tempCheck[2]].cardShow = undefined;//根除原來的圖的物件
            cards[cardCount][row].cardCheck = false;
            cards[tempCheck[1]][tempCheck[2]].cardCheck = false;
            tempCheck = undefined;//初始化暫存區
        }
        changeLock=false;
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
        if(frameCount%upSpeed===0)//每1秒向上移動timer%upSpeed ===0
        {
            messageImg[i].move();
        }
    }
    if(frameCount%upSpeed===0)//每1秒新增一個訊息
    {
        let index = messageRandom();
        messageImg[messageImg.length] = setMessage = new messageData(index,320, 170,70);
    }
}

///////////////////////////////////畫面初始化//////////////////
///////////////////////////////////主程式/////////////////////
let index=0;
function preload() {//載入圖片進緩衝區
    // cardNormal = loadImage("images/card_b.png");//載入預設卡片之背面
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
    stageLoadImg[0] = loadImage("images/banana_img_smile.png");//香蕉人
    // stageLoadImg[1] = loadImage("images/banana_mesg_1.png");//香蕉人說話
    for(let i=0;i<chapters.length;i++)
    {
        bananaMassage[i] = loadImage("images/banana_mesg_"+(i+1)+".png");//香蕉人說話
    }
    stageLoadImg[2] = loadImage("images/banana_frame.png");//關卡目標圖片背景
    stageLoadImg[3] = loadImage("images/game_screen.png");//covL背景圖
    for(let i=0;i<chapters.length;i++)
    {
        let card =[];
        chapters[i].goalImg = loadImage("images/photo_"+(chapterCount+1)+".png");//載入關卡目標圖片
        // for(let ic=1;ic<=chapters[i].cardCount;ic++)//依關卡載入卡片
        // {
        //     card[ic] = loadImage("images/photo_"+1+"_"+ic+".png");//1的位置為i，1為測試值
        // }
        // chapters[i].card = card;
    }
    // for(let role=0;role<1;role++)//i依照談窗張數做修改loadImage("images/suprt_"+i+".png");
    // {
    //     for(let result=0;result<2;result++)
    //     {
    //         let alertImg = new alertImg();
    //         alertImg.result[result] = loadImage("images/suprt_"+role+"_"+result+".png");
    //     }
    // }
    for(let i=0;i<1;i++)//載入協助者成果
    {
        for(let i2=0;i2<2;i2++)
        {
            showLoad = new alertImg();
            showLoad.src = "images/suprt_"+i+"_"+i2+".png";
            showLoad.img = loadImage(showLoad.src);
            showList[index] = showLoad;
            index++;
            console.log("showList: "+showList.length+"i: "+i+"i2: "+i2);
        }
    }
    // let showSrc = "images/suprt_"+clientUserRole+"_"+result+".png";
    // showLoad = loadImage(showSrc);
}
function change() {
    button.remove();
    cardCheck = true;
}
function setup() {
    cnvC  = createCanvas(1280,720);//畫布大小
    cnvR  = createGraphics(300, 400);
    cnvL  = createGraphics(1280, 720);
    canvasC();
    timer =  chapters[chapterCount].time;//初始化關卡時間
   // console.log("time: "+timer);
    //console.log("chapterCount"+chapterCount);
    //console.log("chapterEndCount"+chapterEndCount);
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
    text("救贖之路第一關", width/2, height/2);

    fill(92,167,182);//R,G,B,[A]
    noStroke();
    rectMode(CENTER);
    rect(width/2, height-210, 200,60,5);
    fill(236,240,241);
    textSize(30);
    text("START", width/2, height-200);
}
function playScreen() {//遊戲中畫面
    background(0);
    drawCnvL();
    drawCnvR();
    image(cnvL, 0, 50);
    image(cnvR, 900, 200);//繪圖在底層畫布位置

    timer = countDownTimer(timer);//倒數計時
    fill(0);
    textSize(30);
    text("00:"+timer, width/2, height-620);//布置計時器

    for(let i=0;i<labelImg.length;i++)//顯示分頁
    {
            labelImg[i].display();
        if(frameCount%rightSpeed===0)//timer%rightSpeed ===0
        {
            if(labelImg[i].x <= 900)
            {
                labelImg[i].move();
            }
        }
    }
    if(frameCount%rightSpeed===0)
    {
        let index = labelRandom();
        labelImg[labelImg.length] = setLabel = new labelData(index,200, 150,35);
    }


    if(gameCondition)
    {
        gameScreen = 2;
    }
    /////////////////////////////當協助者有成果時
    console.log("supportIndex: "+supportIndex);
    if(supportIndex!==undefined && supportLock===true)
    {
        if(showY <60)
        {
            showY  +=1;
            image(showList[supportIndex].img,1050,showY ,200,200);
        }
        else if(showY <61)
        {
            showY  +=0.01*3;
            image(showList[supportIndex].img,1050,showY ,200,200);
        }
        else
        {
            showY = -60;
            supportLock = false;
        }
    }
    // show = image(showLoad,1170,40,400,400);
    // if(showY <= 40)
    // {
    //     show.y+=1;
    //     // show.position(showX, showY);
    // }
    // else
    //     {
    //         alertMove = true;
    //     }
    //show.position(1170, 40);//1170, 40最終位置
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
function check(i) {
    cardButton[i].background(chapters[chapterCount].card[i]);
}