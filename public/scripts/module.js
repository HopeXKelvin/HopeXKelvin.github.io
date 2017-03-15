// use ES6
class People{
  constructor(name){
    this.name = name;
  }
  sayHi(){
    console.log(`hi ${this.name} !`);
  }
}

exports.module = People;
