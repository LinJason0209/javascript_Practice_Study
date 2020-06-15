var server = require('http').createServer(handler),
    ip = "192.168.0.13",
    port = 3000,
    fs = require('fs'),
    si = require('socket.io');



//透過網
function handler(request, response) {
    fs.readFile('./eboard.html', function(err, data) {
        if (err)
        {
            response.writeHead(500, {'Content-Type':'text/plain'});
            return response.end('Error loading msg.html');
        }
        response.writeHead(200);
        response.end(data);
    });
}



server.listen(port, ip, function(){
    //node.js server 啟動並監聽時，所呈現的伺服器訊息
    console.log("Server has started.");
});

/*
 * 用法：
 * socket.on 接收另一端訊息
 * socket.emit 將訊息送給到另一端
 * socket.broadcast.emit 將訊息傳送給其他人（不含自己）
 * io.socket.emit 將訊息傳送至包括自己在內的所有人
 * */

var io = si.listen(server);
io.sockets.on('connection', function(socket) {

    //登入初始化
    socket.on('login', function(data)
    {
        //伺服端訊息
        console.log("connected");

        //宣告物件，放置訊息
        var obj = new Object;
        obj.name = data.name;
        obj.msg = data.name + ' 已上線';

        //將在前端輸入的名稱記錄下來
        socket.name = data.name;

        //將自己上線訊息傳給自己的網頁
        socket.emit('msg', obj);

        //告訴其他人你上線了
        socket.broadcast.emit('msg', obj);
    });

    //接受畫布作業訊息
    socket.on('draw', function(data){
        //將畫布作業訊息傳給其他線上的人
        socket.broadcast.emit('show', data);
    });

    //離線
    socket.on('disconnect', function() {
        //宣告物件，放置訊息
        var obj = new Object;
        obj.msg = socket.name + ' 已離開';

        //通知所有人自己已經離開
        io.sockets.emit('msg', obj);
    });

});

let cnvC;//畫布建置
function windowResized() {//確保畫布畫面正常
    centerCanvas();
}
function canvasC() {//底層畫布
    centerCanvas();
    cnvC.background(220);
}
function centerCanvas() {//畫布置中
    let x = (windowWidth - width) / 2;
    let y = (windowHeight - height) / 2;
    cnvC.position(x,y);//console報錯的原因為需要p5js.dom函式庫，解法為換成最新版p5js.main
}

function setup() {
    canvasC();
}
function draw() {
    cnvC  = createCanvas(1280,720);//畫布大小
}
function change(card) {//翻牌
    if(tempCheck === undefined)//如果沒翻過牌
    {
        tempCheck =  cards[1][0];//存下第一雌翻牌的物件
        cards[1][0].cardShow.remove();//刪除原來的圖
        cards[1][0].cardShow = undefined;//根除原來的圖的物件
        cards[1][0].cardCheck = true;//確認翻牌(節約資源用)
        cards[1][0].display();//產生翻面
    }
    else
    {
        cards[1][0].cardShow.remove();//刪除原來的圖
        cards[1][0].cardShow = undefined;//根除原來的圖的物件
        cards[1][0].cardCheck = true;//確認翻牌(節約資源用)
        cards[1][0].display();//產生翻面
        setTimeout(checkSame,500);//延遲執行
    }
}
function checkSame() {
    if(cards[1][0].ID === tempCheck.ID)//對照是否相同ID
    {
        cards[1][0].cardShow.remove();//刪除第二次翻面的物件原來的圖
        tempCheck.cardShow.remove();//刪除第一次翻面的物件原來的圖


        if(chapters[chapterCount].finishCount>0)
        {
            tint(255, 255/(chapters[chapterCount].finishCount/2));//225為0%透明，0為100%透明
            cnvL.image(stageLoadImg[2],0,70,350,450);//畫出此關卡目標圖案背景
            chapters[chapterCount].finishCount -= 2;//增加成功刪除的卡片數
        }
        else if(chapters[chapterCount].finishCount<=0)
        {
            chapterCount+=1;//下一關
            gameScreen = 0;
        }
        //cards[1][0].cardShow  = undefined;//根除原來的圖的物件
        //cards[1][0].cardCheck = false;//確認第二次事件的翻牌(節約資源用)
    }
    else
    {
        cards[1][0].cardShow.remove();//刪除第二次翻面的物件原來的圖
        tempCheck.cardShow.remove();//刪除第一次翻面的物件原來的圖
        cards[1][0].cardShow = undefined;//根除原來的圖的物件
        tempCheck.cardShow = undefined;//根除原來的圖的物件
        cards[1][0].cardCheck = false;
        tempCheck.cardCheck = false;
        // cards[1][0].display();
        // tempCheck.display();
    }
}