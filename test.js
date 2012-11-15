var Model = require("./fishbone");

var Pirate = Model({
  init: function(name){
    this.name = name;
    this.grogs = 0;
  },

  drink: function(){
    this.grogs++;
    if (this.grogs > 100){
      this.trigger("drunk");
    }
  },
  sing: function(){
    console.log("ARR: " + this.name + " WANT MORE!");
  }
});

var jack = new Pirate("Jack");

jack.on("drunk", jack.sing);

for (var i=0; i<110; i++){
  jack.drink();
}