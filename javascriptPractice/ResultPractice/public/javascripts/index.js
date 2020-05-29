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
                alert("請確認資料填妥!")
            }
        }
    }
    else
    {
        alert("您已經加入挑戰，請放棄資格後重新選擇!")
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
    }
    else
    {
        alert("您已經加入挑戰，請放棄資格後重新選擇!")
    }
}

function urlAnalyst() {//解析網址
    let strUrl = location.href;
    let url = new URL(strUrl);
    console.log(url.searchParams.get("user"));
    return url.searchParams.get("user");
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
        socket.emit("ClientUpData",localClient);//送出更新值給www端，因本Client端已更新故可在www端被複寫，ClientUpData = 舊的JoinAdd，為了方便閱讀所以改名
        document.getElementById("MemberSup").innerHTML = localClient.Sup+"/4 位協助者";
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
        location.href =("http://192.168.0.13:3000");//去除附帶參數,192.168.0.13需依照所在區域 WIFI 所提供給本機的虛擬IP做更改 ((再想到方法取虛擬IP前先這樣
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
        location.href='Client.html';
    }
    else
    {
        alert("請選擇您的體驗方式!");
    }
}
