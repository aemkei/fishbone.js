var Model = require("./fishbone");

var Pirate = Model({
  init: function(name){
    this.name = name;
    this.grogs = 0;
  },
  drink: function(){
    if (++this.grogs > 100){
      this.trigger("drunk");
    }
  },
  sing: function(){
    console.log("ARR: " + this.name + " WANT MORE!");
  }
});

var captain = new Pirate("Jack"),
  grogCount = 110;

captain.on("drunk", captain.sing);

while (grogCount--){ captain.drink(); }