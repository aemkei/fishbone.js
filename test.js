var Model = require("./fishbone");

var Whale = Model({
  init: function(name){
    this.name = name;
  },
  kill: function(){
    this.trigger("dead");
  }
});

var moby = new Whale("Dick");

var boom = function(){
  console.log(moby.name, "died");
};

moby.on("dead", function(){
  console.log(moby.name, "died");
});

moby.on("dead", boom);
moby.on("dead", boom);
moby.off("dead", boom);

moby.kill();