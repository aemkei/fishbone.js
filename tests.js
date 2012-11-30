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

  "Multiple arguments in constructor.": function(){
    var Klass = new Model({
      init: function(foo, bar){
        this.foo = foo;
        this.bar = bar;
      }
    });

    var instance = new Klass("foo", "bar");
    return instance.foo == "foo" && instance.bar == "bar";
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
  },

  "Simple inheritance.": function(){

    var Klass1 = Model({
      foo: "foo"
    });

    var Klass2 = Klass1.extend({
      bar: "bar"
    });

    var instance = new Klass2();

    return instance.foo == "foo" && instance.bar == "bar";

  },

  "Override property.": function(){

    var Klass1 = Model({
      foo: "bar"
    });

    var Klass2 = Klass1.extend({
      foo: "foo"
    });

    var instance = new Klass2();

    return instance.foo == "foo";

  },

  "Override method.": function(){

    var Klass1 = Model({
      foo: "foo",
      bar: function(){
        return false;
      }
    });

    var Klass2 = Klass1.extend({
      bar: function(){
        return this.foo;
      }
    });

    var instance = new Klass2();

    return instance.bar() == "foo";
  },

  "Multiple inheritance": function(){
    var Klass1 = Model({ a: "a" });
    var Klass2 = Klass1.extend({ b: "b" });
    var Klass3 = Klass2.extend({ c: "c" });

    var instance = new Klass3();

    return instance.a == "a" && instance.b == "b" && instance.c == "c";
  }
};

for (var description in tests){
  console.log(tests[description]() ? "OK" : "ERROR", "-", description);
}