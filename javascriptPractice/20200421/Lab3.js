
//input();
//studentScore();
// let song = joinSong;
// song();
splitSong();

function input()
{
    let temp = prompt("請輸入新增學號: ","108462005");
}
function studentScore()
{
    let studentIDinput = [100462006,100462007];
    let scoreinput = [92,74];
    let studentID = [100462005,100462008,100462009];
    let score = [89,100,87];
    let set =0;
    for(let value =0; value<studentID.length;value++)
    {
        let IDtemp = studentIDinput[value];
        let scoretemp = scoreinput[value];

        for(let value =0; value<studentID.length;value++)
        {
            if (IDtemp>studentID[value] && IDtemp<studentID[value+1])
            {
                let set = value+1;
                studentID.splice(set,0,IDtemp);
                score.splice(set,0,scoretemp);
                break;
            }
        }
    }
    for(let count=0;count<studentID.length;count++)
    {
        console.log("學號 "+studentID[count]+"同學的學期成績為 "+score[count]);
    }
}
function joinSong()
{
    let lyrics = ["Row row row your boa","Gently down the stream","Merrily merrily merrily merrily","Life is but a dream"];
    let song = lyrics.join(" ")
    //console.log(song);
    return song;
}
function splitSong()
{
    let song = joinSong();
    let arr = song.split(" ");
    let arrindex=[];
    let indexcount=0;
   //console.log(arr);
    for (let value =0;value<arr.length;value++)
    {
        if(arr[value] === "merrily")
        {
            arrindex[indexcount]=value;
            //console.log(arrindex[indexcount]);
            indexcount++;
        }
    }
    console.log("第一次出現 'merrrily'的索引: "+arrindex.shift())
    console.log("最後一次出現 'merrrily'的索引: "+arrindex.pop())

}