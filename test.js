var Model = require("./fishbone");

var Pirate = Model({

  likes: "GROG",

  init: function(name){
    this.name = name;
    this.grogs = 0;
  },
  drink: function(){
    if (++this.grogs >= 100){
      this.trigger("drunk");
    }
  },
  yell: function(){
    console.log(this. name + " WANT MORE: " + this.likes);
  }
});

var captain = new Pirate("Jack"),
  rounds = 20;

captain.on("drunk", captain.yell);

function neverbeingcalled(){
  console.error("AAR!");
}

captain.on("drunk", neverbeingcalled);
captain.off("drunk", neverbeingcalled);

while (rounds--){ 
  captain
    .drink()
    .drink()
    .drink()
    .drink()
    .drink(); 
}