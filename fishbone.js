function Model(object){
  return function(options){
    
    var target = this,
      observers = {},
      method, property,
      undefined;
  
    target.on = function(event, listener){
      var listeners = observers[event] || (observers[event] = []);
      listeners.push(listener);
    };
    
    target.trigger = function(event, data){
      for (
        var listeners = observers[event], index = 0;
        listeners && index < listeners.length;
        index++
      ){
        listeners[index](data);
      }
    };

    target.off = function (event, listener) {
      for (
        var listeners = observers[event] || [], index;
        listener && (index = listeners.indexOf(listener)) > -1;
      ){
        listeners.splice(index, 1);
      }

      observers[event] = listeners;
    };

    for (property in object) {
      method = object[property];
      if (object.hasOwnProperty(property) && typeof method == 'function') {
        target[property] = function(){
          var value = this.apply(target, arguments);
          return value === undefined ? target : value;
        }.bind(method);
      }
    }

    target.init(options);
  };
};

if (typeof module == "object"){
  module.exports = Model;
}