var Model = require("./fishbone");              // require module (Node only)

var Pirate = Model({                            // simple class creator
  likes: "GROG",                                // instance properties
  init: function(name){                         // init is the main entrance
    this.name = name;                           // options can be passed
    this.grogs = 0;
  },
  drink: function(){                            // instance method
    if (++this.grogs >= 100){
      this.trigger("drunk");                    // trigger an event
    }
  },
  yell: function(){
    console.log("WANT MORE: " + this.likes);    // this is always in context
  }
});

var Captain = Pirate.extend({                   // simple inheritance
  likes: "STRONG GROG"
});

var captain = new Captain("Jack"),              // create an instance
  rounds = 20;

captain.on("drunk", captain.yell);              // add event listener

function neverbeingcalled(){                    // pseudo listener
  console.error("AAR!");
}

captain.on("drunk", neverbeingcalled);          // add event listener
captain.off("drunk", neverbeingcalled);         // remove event listener

while (rounds--){ 
  captain
    .drink()                                    // chaining FTW!
    .drink()                                    // chaining FTW!
    .drink()                                    // chaining FTW!
    .drink()                                    // chaining FTW!
    .drink();                                   // chaining FTW!
}