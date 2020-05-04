function Monster(name,id,terribleness,intelligence) {
    this.name = name;
    this.id = id;
    this.terribleness = terribleness;
    this.intelligence = intelligence;
}
// Monster.prototype.energy=function(){return this.terribleness*6+this.intelligence*4};
Monster.prototype.energy=function(){return this.terribleness*6+this.intelligence*4};

//let james = new Monster("James",1,100,20);
let randall = new Monster("Randall",2,70,60);

////new的過程////
let james ={};
Monster.apply(james,["James",1,100,20]);
james.__proto__ = Monster.prototype;

console.log("Generating "+james.energy()+" electrical energy");