// console.log(process.memoryUsage());//目前記憶體狀態
// console.log(__dirname); //正在被執行的js檔所在目錄
//console.log(__filename); //正在被執行的js檔名
//const => 常數定義的宣告，意思是只能宣告一次不能被變動
const EventEmitter =  require("events");//模組引入事件處理 require => 模組引入器
const birthdayEvent = new EventEmitter();//創建事件物件
birthdayEvent.on("birthday",function (name,age) {//觸發事件的接收端註冊 輸入值為(拋出事件的來源，接收後要做的事情)。PS: 接收端的註冊要在拋出的前面
    console.log('give a present! '+name +age);
})

class Person
{
    constructor(name, age)
    {
        this.name = name;
        this.age = age;
    }
    becomeOlder()
    {
        this.age +=1;
        birthdayEvent.emit("birthday",this.name,this.age);//事件射出，意思為拋出事件出發的訊息給接收端
    }
}

let one = new Person("One",23);
let two = new Person("two",25);
//one.becomeOlder();
/*
console.log(one.becomeOlder());
console.log(two.becomeOlder());*/

//////////////檔案創立、儲存、編寫、修改//////////////
//(1)寫檔、儲存
const  fs = require("fs");//註冊檔案寫入事件處理
fs.writeFile("one.json",JSON.stringify(one),function () {
    console.log("Success");
})

//(2)讀檔
fs.readFile("one.json","utf-8",function (err,data) {//輸入值(被讀的檔案名,編碼方式)
    if (err) throw err;
    console.log(JSON.parse(data));
})
//正確寫法: 寫完再讀
const  fs = require("fs");//註冊檔案寫入事件處理
fs.writeFile("one.json",JSON.stringify(one),function () {//先寫
    console.log("Success");

    fs.readFile("one.json","utf-8",function (err,data) {//後讀
        if (err) throw err;
        console.log(JSON.parse(data));
    })
})