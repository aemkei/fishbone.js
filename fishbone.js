
// Fishbone.js
//
// Version: 0.9.7
// URL: https://github.com/aemkei/fishbone.js
// Author: Martin Kleppe <kleppe@ubilabs.net>
// License: WTFPL

Model =

// make module Node.js compatible
(eval("module") || {}).exports =

function _(object){

  // return class constructor
  function Klass(){
    
    // references used across instances
    var target = this,
      observers = {},
      key, property,
      listeners,
      value,
      index,
      undefined;
  
    // add an event listener
    target.on = function(event, listener){
      // push listerner to list of observers
      listeners = observers[event] || (observers[event] = []);
      listeners.push(listener);
    };
    
    // trigger a given event
    target.trigger = function(event, data){
      for (
        // cycle through all listerners for a given event
        listeners = observers[event], index = 0;
        listeners && index < listeners.length;
      ){
        // call listener and pass data
        listeners[index++](data);
      }
    };

    // remove (a single or all) event listener
    target.off = function (event, listener) {
      for (
        // get index of the given listener
        listeners = observers[event] || [];
        // find all occurrences
        listener && (index = listeners.indexOf(listener)) > -1;
      ){
        // remove the listener
        listeners.splice(index, 1);
      }

      // assign the new list
      observers[event] = listener ? listeners : [];
    };

    // cycle through all properties
    for (key in object) {
      property = object[key];
        
      // test if property is a function
      target[key] = (typeof property == 'function') ?

        // wrap method
        function(){
          // keep the original context
          value = this.apply(target, arguments);
          // add chainablity if nothing was returned
          return value === undefined ? target : value;
        }.bind(property) :
      
        // copy property
        property;
    }

    target.init && target.init.apply(target, arguments);
  }

  // allow class to be extended
  Klass.extend = function(overrides, merge, key){
    
    merge = {};

    // copy all object properties
    for (key in object){
      merge[key] = object[key];
    }

    // override object properties
    for (key in overrides){
      merge[key] = overrides[key];
    }

    return _(merge);
  };

  return Klass;
};
