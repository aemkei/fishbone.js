var Model = require("./fishbone"); 

var tests = {
  "Class based instance property.": function(){
    var Klass = new Model({
      foo: "foo"
    });

    var instance = new Klass();
    return instance.foo == "foo";
  },

  "Instance property on init.": function(){
    var Klass = new Model({ 
      init: function(){
        this.foo = "foo";
      }
    });

    var instance = new Klass();
    return instance.foo == "foo";
  },

  "Instance property via options.": function(){
    var Klass = new Model({ 
      init: function(foo){
        this.foo = foo;
      }
    });

    var instance = new Klass("foo");
    return instance.foo == "foo";
  },

  "Instance property via method.": function(){
    var Klass = new Model({ 
      setFoo: function(foo){
        this.foo = foo;
      }
    });

    var instance = new Klass();
    instance.setFoo("foo");
    return instance.foo == "foo";
  },

  "Automatic method chaining.": function(){
    var Klass = new Model({ 
      foo: function(){ },
      bar: function(){ }
    });

    var instance = new Klass();
    
    return instance.foo().foo().bar().bar() == instance;
  },

  "No chaining for methods with return values.": function(){
    var Klass = new Model({ 
      foo: function(){ },
      bar: function(){ return "foo"; }
    });

    var instance = new Klass();
    
    return instance.foo().foo().bar() == "foo";
  },

  "Add event handler.": function(){
    var Klass = new Model({ 
      triggerEvent: function(){ 
        this.trigger("event", "foo");
      }
    });

    var called = false;
    var instance = new Klass();

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
    var instance = new Klass();

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
    var instance = new Klass();

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