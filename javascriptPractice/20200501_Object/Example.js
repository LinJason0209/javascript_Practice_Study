// function Person(name, age) {
//     this.name = name;
//     this.age = age;
// }
//
// Person.prototype.becomeOlder = function () {
//     this.age += 1;
// }
//
// let john = new Person('john', 18);
// let mary = new Person('mary', 18);
//
// console.log(john);
// console.log(mary);
//
// john.becomeOlder();
// mary.becomeOlder();
//
// console.log(john);
// console.log(mary);
//
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    becomeOlder() {
        this.age += 1;
    }
}


let john = new Person('john', 18);
let mary = new Person('mary', 18);

console.log(john);
console.log(mary);

john.becomeOlder();
mary.becomeOlder();

console.log(john);
console.log(mary);