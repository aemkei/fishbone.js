var Model = require("./fishbone");

var Pirate = Model({
  init: function(name){
    this.name = name;
    this.grogs = 0;
  },
  drink: function(){
    if (++this.grogs >= 100){
      this.trigger("drunk");
    }
  },
  sing: function(){
    console.log("ARR: " + this.name + " WANT MORE!");
  }
});

var captain = new Pirate("Jack"),
  rounds = 20;

captain.on("drunk", captain.sing);

while (rounds--){ 
  captain
    .drink()
    .drink()
    .drink()
    .drink()
    .drink(); 
}