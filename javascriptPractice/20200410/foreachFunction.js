

let name = "My Name";
let firstOther = "Mary";
let recards = ["1", "2","3"];

console.log(name +" and " + firstOther);
console.log(`hollow ${name} and ${firstOther}`);
console.log(recards[0]);
let sum = add(2,2);
console.log(sum);

function add(i,j)
{
     let sum = i+j;

     return sum;
}

let Double = function(i,j)//把add拉到外面以變數型態定義
{
    let sum2 = i*j;
    return sum2;
}


(function(i,j){
    return i+j;
}(2,2))//IIFE寫法

let sources =[51,60,70,85,91];
for(let i=0;i<sources.length;i++)//遍訪方法_1
{}
console.log(`For loop ${sources}`);

for(let source of sources) //遍訪方法_2
{}
console.log(`For of: ${sources}`);


function f(sources)/////遍訪方法_函式導向
{}
sources.forEach(f);
console.log(`For Function/forEach ${sources}`);

let index = sources.indexOf(70);//指定陣列位置
console.log("Index= "+index);

let values = [25,10,23,31,20,22,21];
let sumValue =0;
for(let value of values)
{
    sumValue+=value;
}
console.log(`ValueSum = ${sumValue}`);

let line = "1;數位一;106462001;林謙耘LIN,CHIEN-YUN";//字串拆解 split()函式
let results = line.split(';');
console.log("Split= "+results);

let resultsJoin = results.join(",");//字串相黏 join()
console.log("Join= "+ resultsJoin );

let resourcesSlice = results.slice(1,4);//字串切片
console.log("Slice= "+resourcesSlice);