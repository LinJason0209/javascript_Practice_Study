const express = require("express");//引入express模組函式庫
const app = express();//引入express函式(模組return的函式)，這部分等於建立伺服器
const http = require("http").Server(app);//引入http模組，走express伺服器架構
const io = require("socket.io")(http);//引入socket.io介面函式，走http形式架構

app.use(express.static(__dirname));//對client端開放的資料位置，__dirname指目前所在目錄，+"/Public"指定開放目錄

io.on("connection",function (socket) { //建立client端監測接收端，如監測到connection類型被client端丟出，則印出丟出的client id位置
    console.log("a client connected:"+socket.id);
    socket.on("directive",function (message) {//印出client端丟出的資料，確認是否有收到
        console.log(message);
        socket.broadcast.emit("Screen",message);//從client端接收到server端後，再傳至其他server端的程式做處理，這裡是把資料再傳給Screen.js中做處理
    });
})

http.listen(3000,function () { //建立監測3000 port是否開啟。這裡意思為監測伺服器是否啟動
    console.log("listening on *:3000");
})