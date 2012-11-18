var Model = require("./fishbone"); 

var tests = {
  "Class based instance property.": function(){
    var Klass = new Model({
      foo: "bar"
    });

    var instance = new Klass();
    return instance.foo = "bar";
  },

  "Instance property on init.": function(){
    var Klass = new Model({ 
      init: function(){
        this.foo = "bar";
      }
    });

    var instance = new Klass();
    return instance.foo = "bar";
  },

  "Instance property via options.": function(){
    var Klass = new Model({ 
      init: function(options){
        this.foo = options;
      }
    });

    var instance = new Klass("bar");
    return instance.foo = "bar";
  },

  "Instance property via method.": function(){
    var Klass = new Model({ 
      setFoo: function(foo){
        this.foo = foo;
      }
    });

    var instance = new Klass("bar");
    instance.setFoo("bar");
    return instance.foo = "bar";
  },

  "Automatic method chaining.": function(){
    var Klass = new Model({ 
      foo: function(){ },
      bar: function(){ }
    });

    var instance = new Klass("bar");
    
    return instance.foo().foo().bar().bar() == instance;
  },

  "No chaining for methods with return values.": function(){
    var Klass = new Model({ 
      foo: function(){ },
      bar: function(){ return "bar"; }
    });

    var instance = new Klass("bar");
    
    return instance.foo().foo().bar() == "bar";
  },

  "Add event handler.": function(){
    var Klass = new Model({ 
      triggerEvent: function(){ 
        this.trigger("event", "foo");
      }
    });

    var called = false;
    var instance = new Klass("bar");

    instance.on("event", function(data){
      called = data;
    });

    instance.triggerEvent();
    
    return called == "foo";
  },

  "Remove single event handler.": function(){
    var Klass = new Model({ 
      triggerEvent: function(){ 
        this.trigger("event");
      }
    });

    var called = false;
    var instance = new Klass("bar");

    var callback = function(){
      called = true;
    };

    instance.on("event", callback);
    instance.off("event", callback);

    instance.triggerEvent();
    
    return !called;
  },

  "Remove all handlers for a single event type.": function(){
    var Klass = new Model({ 
      triggerEvent: function(){ 
        this.trigger("event");
      }
    });

    var called = false;
    var instance = new Klass("bar");

    var callback = function(){
      called = true;
    };

    instance.on("event", callback);
    instance.on("event", callback);
    instance.off("event");

    instance.triggerEvent();
    
    return !called;
  }
};

for (var description in tests){
  console.log(tests[description]() ? "OK" : "ERROR", "-", description);
}