
// Fishbone.js
//
// Version: 0.9.5
// URL: https://github.com/aemkei/fishbone.js
// Author: Martin Kleppe <kleppe@ubilabs.net>
// License: WTFPL

function Model(object){

  // return a constructor
  return function(options){
    
    // references used across instances
    var target = this,
      observers = {},
      key, property,
      listeners,
      value,
      index,
      undefined;
  
    // add an event listner
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
        index++
      ){
        // call listener and pass data
        listeners[index](data);
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

      // only handle object's own properties
      if (object.hasOwnProperty(key)) {
        
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
    }

    target.init && target.init(options);
  };
};

// make module Node.js compatible 
if (typeof module == 'object'){
  module.exports = Model;
}