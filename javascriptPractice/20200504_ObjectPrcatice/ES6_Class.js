class Monster {
    constructor(name,id,terribleness,intelligence) {
        this.name = name;
        this.id = id;
        this.terribleness = terribleness;
        this.intelligence = intelligence;
    }
    energy() {return this.terribleness*6 + this.intelligence*4};
}
let james = new Monster("James",1,100,20)
console.log(james.energy())