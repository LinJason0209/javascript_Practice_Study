
function addJoinMember()//本Client端Join按下後更新
{
    if(localClient.rolelock === undefined || localClient.rolelock === null)
    {
        if(localClient.Join<1)
        {
            if(checkInput("JoinNameText") !== "") {
                localClient.Join += 1;//更新本Client端Join值
                localClient.rolelock = 1;
                console.log("in");
                socket.emit("ClientUpData", localClient);//送出Join更新值給www端，因本Client端已更新故可在www端被複寫
                document.getElementById("MemberJoin").innerHTML = localClient.Join + "/1 位體驗者";
            }
            else
            {
                alert("請確認資料填妥!");
            }
        }
        else
        {
            alert("體驗者人數已滿!");
        }
    }
    else
    {
        alert("您已經加入挑戰，請放棄資格後重新選擇!");
    }
}


function addSubMember()//本Client端Support按下後更新
{
    if(localClient.rolelock === undefined || localClient.rolelock === null)
    {
        if(localClient.Sup<=3)
        {
            if(checkInput("SupNameText") !== "")
            {
                localClient.Sup +=1;//更新本Client端Sup值
                localClient.rolelock =2;
                socket.emit("ClientUpData",localClient);//送出Sup更新值給www端，因本Client端已更新故可在www端被複寫
                document.getElementById("MemberSup").innerHTML = localClient.Sup+"/4 位協助者";
                // changeAction();
                // location.href="Client.html";
            }
            else
            {
                alert("請確認資料填妥!")
            }
        }
        else
        {
            alert("協助者人數已滿!");
        }
    }
    else
    {
        alert("您已經加入挑戰，您可以修改名稱與生日，或放棄資格後重新選擇!")
    }
}


function checkInput(InputId) {//透過id找到輸入之欄位，確認欄位的value元素不是預設值

    let element = document.getElementById(InputId);//SupNameText
    let value = element.value;
    console.log("value: "+value);
    return value;
}

function cancelAdd(getId)
{
    console.log(getId.id);
    if(getId.id === "SupCancelButton" && localClient.rolelock ===2)
    {
        localClient.Sup -=1;//更新本Client端Sup值
        localClient.rolelock = undefined;
        console.log(localClient);
        socket.emit("ClientUpData",localClient);//送出更新值給www端，因本Client端已更新故可在www端被複寫
        document.getElementById("MemberSup").innerHTML = localClient.Sup+"/4 位協助者";
        urlReset();
    }
    else if(getId.id === "JoinCancelButton" && localClient.rolelock ===1)
    {
        localClient.Join -=1;//更新本Client端Sup值
        localClient.rolelock = undefined;
        console.log(localClient);
        localClient.GameLock =false;
        socket.emit("ClientUpData",localClient);//送出更新值給www端，因本Client端已更新故可在www端被複寫，ClientUpData = 舊的JoinAdd，為了方便閱讀所以改名
        document.getElementById("MemberSup").innerHTML = localClient.Sup+"/1 位體驗者";
        urlReset();
    }
}
function urlReset() {
    if(localClient.IP==="::ffff:127.0.0.1" || localClient.IP==="::1")
    {
        location.href =("http://localhost:3000/");
    }
    else
    {
        location.href =("http://192.168.137.1:3000");//去除附帶參數,192.168.137.1本機預設內建區往虛擬碼(當WIFI時的IP)
    }
}
function urlResetForClient() {
    if(localClient.IP==="::ffff:127.0.0.1" || localClient.IP==="::1")
    {
        location.href =("http://localhost:3000/Client.html");
    }
    else
    {
        location.href =("http://192.168.137.1:3000//Client.html");//去除附帶參數,192.168.0.13需依照所在區域 WIFI 所提供給本機的虛擬IP做更改 ((再想到方法取虛擬IP前先這樣
    }
}

function changeAction()
{
   let x=document.getElementById("SupModelForm")
    x.action="Client.html"
    x.submit()
}
function startGame() {
    if(localClient.rolelock !== undefined || localClient.rolelock === null)
    {
        if(localClient.Join === 1)
        {
            if(localClient.rolelock === 1)
            {
                let sents = urlAnalyst();
                sentData(sents);
                localClient.GameLock = true;
                socket.emit("ClientUpData",localClient);//送出更新值給www端，因本Client端已更新故可在www端被複寫
                location.href='Screen.html';
            }
            if (localClient.rolelock === 2 && localClient.GameLock === true)
            {
                let sents = urlAnalyst();
                sentData(sents);
                socket.emit("ClientUpData",localClient);//送出更新值給www端，因本Client端已更新故可在www端被複寫
                location.href='Client.html';
            }
            else if(localClient.rolelock === 2)
            {
                console.log("in");
                alert("請確認體驗者已參加，按下START");
            }
        }
        else
        {
            alert("請確認體驗者已參加，按下START");
        }
    }
    else
    {
        alert("請選擇您的體驗方式!");
    }
}
function urlAnalyst() {//解析網址
    let strUrl = location.href;
    let url = new URL(strUrl);
    let sents =[];
    sents[0] = url.searchParams.get("user")
    if(localClient.rolelock === 1)
    {
        sents[1] = url.searchParams.get("JoinBirth");
    }
    return sents;
}
function sentData(sents){
    localClient.user = sents[0];
    localClient.JoinBirth = sents[1];
}
function reStartGame(){
    if(localClient.GameLock === false)
    {
        console.log(localClient.IP);
        console.log(localClient.GameLock);
            socket.emit("RestartIndexWWW",function () {
            });
    }
    else if(localClient.GameLock === true)
    {
        console.log(localClient.IP);
        console.log(localClient.GameLock);
            alert("請等遊戲結束後再繼續");
    }
}
/////////////////////clientSupport///////////////////
function catchJoinName(saveBase) {//取得體驗者名稱，透過找尋角色種類取得索引
    let catchIndex = (element) => element === 1;
    let index = saveBase.rolelocks.findIndex(catchIndex);
    let JoinName = saveBase.users[index];
    return JoinName;
}
function catchUserName(ClientIP) {
    let index = ClientIP
}
function showSupName(element) {
    if(element !==undefined && element !== localClient.user)
    {
        return element;
    }
}
// function tempNameList(tempName) {
//     let index=0;
//     if(tempName[index]===undefined)
//     {
//
//     }
// }
function answerSubmit() {
    //let answer = "";
    let formElement = document.getElementById("AnswerFrom");
    result.answer = formElement[0].value;
    console.log("answer:");
    console.log(result.answer);
    answerCheck(result.answer);
}
// function answerCheck(answer) {///取得sumit資料，並送到www判斷答案是否正確
//     //socket.emit("getAnswer",setQuest.questRoleIndex,setQuest.questIndex,answer);//(Role,questIndex,Answer)
// }
// function simpleChoiceQuest(questIndex) {//自製語法糖，方便處理題目
//     if(questIndex === 0)
//     {
//         return setQuest.questBase.firstQuest;
//     }
//     else if(questIndex === 1)
//     {
//         return setQuest.questBase.secondQuest;
//     }
//     else if(questIndex === 2)
//     {
//         return setQuest.questBase.thirdQuest;
//     }
// }
function getRole(){//選角
    //Math.random取樹為0.0000~0.999，Math.floor為無條件捨去到比自身小的最大整數，這裡的範圍直為1~4
    let role = Math.floor(Math.random()*4)+0;//會回傳之間的隨機數字，*x)+y的意思為y~x的值
    return role;
}
function checkAnswer(answer,role,quest) {//對答案
    return answer === setQuest.AnswerDataBase[role].answer[quest];
}
function checkEffect(role,checkAnswer){//反饋
    console.log("checkEffect: "+role+checkAnswer);
    if(checkAnswer === true)
    {
        return  setQuest.EffectDataBase[role].success;
    }
    else if(checkAnswer === false)
    {
        return  setQuest.EffectDataBase[role].fault;
    }
}
function countDownTimer(time) {//計時器，兼處理換關處理
    if (frameCount%30===0 && time>0)//60fps為1秒
    {
        time--;
    }
    else if (time<=0)
    {
        for(let row=0;row<cards[chapterCount+1].length;row++)
        {
            if(cards[chapterCount+1][row].cardShow!==undefined)
            {
                cards[chapterCount+1][row].cardShow.remove();
                cards[chapterCount+1][row].cardShow = undefined;
            }
        }
        time="GAME OVER";
        console.log("chapterCount:"+chapterCount);
        if(chapterCount+1>=chapterEndCount)
        {
            gameCondition = true;
            gameScreen =2;
        }
        else
        {
            chapterCount++;//下一關
            //gameScreen = 0;
            if(chapterCount+1<=chapterEndCount)
            {
                time = chapters[chapterCount].time;
                rightSpeed = chapters[chapterCount].rightSpeed;
                upSpeed = chapters[chapterCount].upSpeed;
            }

        }
    }
    return time;
}



