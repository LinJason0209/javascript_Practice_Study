////////////////////ES6以前 建構函式寫法///////////////////////
function Person(name,age)//模擬物件類別(class)，PS: 字首要大寫!!
{
    this.name = name;
    this.age = age;
    this.beOlder = function (year) {
        this.age += year;
    }
}
//單一類別寫法
let Mary =//單一類別
    {
        name:"Mary",//方法
        age:18,
        beOlder: function (year) {
            this.age +=year;
        }
    }

//ES6以前使用建構函式的prototype共用空間，來模擬物件導向的"繼承"
function Dog(name, age)
{
    this.name = name;
    this.age = age;
}
Dog.prototype.becomeOlder = function (age) {//Dog這個建構函式中的prototype共用空間中新增一個becomeOlder函式作為方法
    this.age =this.age + age;
}
//使用物件的方式,使用new來依照指定建構函式建立物件，new的運作過程: 建立一個空物件 => 將參照的建構函式中的方法，用apply()放入新的空函式中 => 將這個空物件的prototype空間指向改成參照的建構函式的prototype共用空間
let chocolate = new Dog("Chocolate",10);
////////////////////ES6 類別(建構函式)寫法///////////////////////
class Person2
{
    constructor(name,age)
    {
        this.name = name;
        this.age = age;
    }
    becomeOlder()
    {
        this.age += 1;
        return this.age;
    }
}
//調用類別
let mary = new Person2("John",18);
let result = mary.becomeOlder();
console.log(result);