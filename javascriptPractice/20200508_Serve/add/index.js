//////模組製作，名稱一定要訂為index.js//////////
function add(i,j) {
    return i+j;
}
module.exports=add;///回傳什麼東西，模組就是吐出什麼東西
////////Class模組寫法///////////////
class Calcolate
{
    constructor()
    {

    }
    add(i,j)
    {
        return i+j;
    }
}
module.exports=Calcolate;