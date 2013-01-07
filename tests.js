var isBrowser = typeof window != "undefined";

if (!isBrowser){
  Model = require("./fishbone");
}

var tests = {
  "Class based instance property.": function(){
    var Klass = Model({
      foo: "foo"
    });

    var instance = new Klass();
    return instance.foo == "foo";
  },

  "Instance property on init.": function(){
    var Klass = Model({
      init: function(){
        this.foo = "foo";
      }
    });

    var instance = new Klass();
    return instance.foo == "foo";
  },

  "Instance property via options.": function(){
    var Klass = Model({
      init: function(foo){
        this.foo = foo;
      }
    });

    var instance = new Klass("foo");
    return instance.foo == "foo";
  },

  "Multiple arguments in constructor.": function(){
    var Klass = Model({
      init: function(foo, bar){
        this.foo = foo;
        this.bar = bar;
      }
    });

    var instance = new Klass("foo", "bar");
    return instance.foo == "foo" && instance.bar == "bar";
  },

  "Instance property via method.": function(){
    var Klass = Model({
      setFoo: function(foo){
        this.foo = foo;
      }
    });

    var instance = new Klass();
    instance.setFoo("foo");
    return instance.foo == "foo";
  },

  "Automatic method chaining.": function(){
    var Klass = Model({
      foo: function(){ },
      bar: function(){ }
    });

    var instance = new Klass();
    
    return instance.foo().foo().bar().bar() == instance;
  },

  "No chaining for methods with return values.": function(){
    var Klass = Model({
      foo: function(){ },
      bar: function(){ return "foo"; }
    });

    var instance = new Klass();
    
    return instance.foo().foo().bar() == "foo";
  },

  "Add event handler.": function(){
    var Klass = Model({
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

  "Multiple event handlers.": function(){

    var first = false;
    var second = false;

    var Klass = Model({
      first: function(data){
        first = data;
      }
    });

    var instance = new Klass();

    instance.on("event", instance.first);
    instance.on("event", function(data){
      second = data;
    });

    instance.trigger("event", true);
    
    return first && second;
  },

  "Remove single event handler.": function(){
    var Klass = Model({
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
    var Klass = Model({
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
  },

  "Super methods": function(){
    var Klass1 = Model({
      bar: "bar",
      foo: function(){
        return this.bar;
      }
    });

    var Klass2 = Klass1.extend({
      foo: function(){
        return "foo" + this.__foo();
      }
    });

    var instance = new Klass2();

    return instance.foo() == "foobar";
  },

  "Super properties": function(){
    var Klass1 = Model({
      bar: "bar",
      foo: function(){
        return this.bar;
      }
    });

    var Klass2 = Klass1.extend({
      bar: "foo",
      foo: function(){
        return this.bar + this.__bar;
      }
    });

    var instance = new Klass2();

    return instance.foo() == "foobar";
  },

  "Second level super properties": function(){
    var Klass1 = Model({
      bar: "bar"
    });

    var Klass2 = Klass1.extend();

    var Klass3 = Klass2.extend({
      bar: function(){
        return this.__bar;
      }
    });

    var instance = new Klass3();

    return instance.bar() == "bar";
  }
};

var log = isBrowser ? function(message){
  document.write(message + "<br>");
} : console.log;

for (var description in tests){
  log((tests[description]() ? "OK" : "ERROR") + " - " + description);
}