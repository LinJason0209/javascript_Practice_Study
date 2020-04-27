//
// let inputlisten = require("readline");
// let inputWrite = inputlisten.createInterface(process.stdin, process.stdout);
// //inputWrite.setPrompt("Cube Size: ");
// inputWrite.setPrompt("input: ");
// inputWrite.prompt();
//
// let size =0;
// inputWrite.on("line",function (line)
// {
//     //size = line.trim();
//     let num = line.trim();
// // console.log("CubeVolume = "+computeCubeVolume2(size))
// // console.log("CubeVolume2 = "+computeCubeVolume(size));
//     //console.log("bug: "+num);
//
//     // num = parseInt(num);
//     // let result = isPrime(num);
//     // printResult(result);
//     // inputWrite.prompt();
//
// })

//////////////////////////////////////////////
// let computeCubeVolume2 = function(size)
// {
//     return Math.pow(size,2);
// }
///////////////////////////////////////////////


//let computeCubeVolume = size => Math.pow(size,3);



////////////////Q1//////////////////
function computeCubeVolume(size)
{
    return Math.pow(size,3);

}
let result_1a = computeCubeVolume(5);
//console.log(result_1a);
////////////////Q1//////////////////


////////////////Q2//////////////////
let computeCubeSurfaceArea = function (size)
{
    return Math.pow(size,2)*6;
}
let result_1b = computeCubeSurfaceArea(5);
//console.log(result_1b);
////////////////Q2//////////////////


////////////////Q3//////////////////
function compute(sizes, operation)
{
    return sizes.map(operation);
}

let resultVolumes = compute([1,2,3,4,5],side => Math.pow(side,3));
let resultSurfaceAreas = compute([1,2,3,4,5], side => Math.pow(side,2)*6);
//console.log("resultVolumes = "+resultVolumes);
//console.log("resultSurfaceAreas = "+resultSurfaceAreas);
////////////////Q3//////////////////



////////////////Q4//////////////////
function isPrime(num)
{
    if(typeof num !=="number" || num <= 1)
    {
        throw '輸入錯誤,請輸入大於1的正整數';
    }
    for(let i=2;i<num;i++)
    {
        if(num%i ===0)
        {
            return false ;
        }
    }
    return true;
}

function printResult(result)
{
    if(result === true)
    {
        console.log(`${result},輸入之數值為質數`);
    }
    else if (result === false)
    {
        console.log(`${result},輸入之數值不是質數`);
    }
}
let result = isPrime(4,2,3);
printResult(result);
// let input_1=108462005;
// let input_2;
// let input_3=[4,64,87];
//
// let sourceInput = [input_1,input_2,input_3];

//let results = sourceInput.map(isPrime);
//results.map(printResult);


////////////////Q4//////////////////
// let operation = side => Math.pow(side,3);


// let computeCubeVolume = size => Math.pow(size,2);