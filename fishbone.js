
// Fishbone.js
//
// Version: 1.0.1
// URL: https://github.com/aemkei/fishbone.js
// Author: Martin Kleppe <kleppe@ubilabs.net>
// License: WTFPL

Model =

function _(
  object, // module definition
  key, value, // placeholder
  undefined
){

  // return class constructor
  function Klass(){
    
    // references used across instance
    var target = this,
      observers = {};
  
    // add an event listener
    target.on = function(event, listener){
      // push listerner to list of observers
      (observers[event] || (observers[event] = []))
        .push(listener);
    };
    
    // trigger a given event
    target.trigger = function(event, data){
      for (
        // cycle through all listerners for a given event
        var value = observers[event], key = 0;
        value && key < value.length;
      ){
        // call listener and pass data
        value[key++](data);
      }
    };

    // remove (a single or all) event listener
    target.off = function (event, listener) {
      for (
        // get index of the given listener
        value = observers[event] || [];
        // find all occurrences
        listener && (key = value.indexOf(listener)) > -1;
      ){
        // remove the listener
        value.splice(key, 1);
      }

      // assign the new list
      observers[event] = listener ? value : [];
    };

    // cycle through all properties
    for (key in object) {
      value = object[key];
        
      // test if value is a function
      target[key] = (typeof value == 'function') ?

        // wrap method
        function(){
          // add chainablity if nothing was returned
          return (
            // keep the original context
            value = this.apply(target, arguments)
          ) === undefined ? target : value;
        }.bind(value) :
      
        // copy property
        value;
    }

    target.init && target.init.apply(target, arguments);
  }

  // allow class to be extended
  Klass.extend = function(overrides){
    
    value = {};

    // copy all object properties
    for (key in object){
      value[key] = object[key];
    }

    // override object properties
    for (key in overrides){
      value[key] = overrides[key];
      
      // store reference to super properties
      object[key] !== undefined && (
        value["__" + key] = object[key]
      );
    }

    return _(value);
  };

  return Klass;
};

// make module Node.js compatible
if (typeof module == "object") {
  module.exports = Model;
}