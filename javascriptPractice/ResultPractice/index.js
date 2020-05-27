// /**
//  * Deal with database fs/////////////////////存檔
//  */
// const fs = require("fs");
// io.on("SaveClient",function (SaveClient) {//儲存來自體驗者的資訊
//     fs.writeFile("ClientData.json", JSON.stringify(SaveClient), function () {
//         // console.log(" setClientIP(0)="+ SaveClientIP+" Save sucess !");//browser端印出
//
//
//         fs.readFile("ClientData.json", "utf-8", function (err, data) {//讀檔
//             if (err) throw err;
//             console.log("LoadClient=" + JSON.parse(data));
//             socket.broadcast.emit("UpDate", JSON.parse(data));//再將更新的IP送出
//         })
//     })
// })
//
// socket.on("SaveSubClient",function (SaveSubClient) {//儲存來自協助者的資訊
//     fs.appendFile("ClientData.json",JSON.stringify(SaveSubClient),function () {//補在後方，不覆蓋
//
//
//         fs.readFile("ClientData.json","utf-8",function (err,data) {//讀檔
//             if (err) throw err;
//             console.log("LoadClientSub="+JSON.parse(data));
//             socket.broadcast.emit("UpDate",JSON.parse(data));//再將更新的Client資訊送出
//         })
//     })
// })