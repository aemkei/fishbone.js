!function(undefined){
  
  function bindAll(target, object) {
    var method, property;

    for (property in object) {
      method = object[property];
      if (object.hasOwnProperty(property) && typeof method == 'function') {
        target[property] = method.bind(target);
      }
    }
  }

  function observable(object){
    var observers = {};
    
    object.on = function(event, listener){
      var listeners = observers[event] || (observers[event] = []);
      listeners.push(listener);
    };
    
    object.trigger = function(event, data){
      for (
        var listeners = observers[event], index = 0;
        listeners && index < listeners.length;
        index++
      ){
        listeners[index](data);
      }
    };

    object.off = function (event, listener) {
      for (
        var listeners = observers[event] || [], index;
        listener && (index = listeners.indexOf(listener)) > -1;
      ){
        listeners.splice(index, 1);
      }

      observers[event] = listeners;
    };
  }

  this.Model = function(object){
    return function(options){
      observable(this);
      bindAll(this, object);
      this.init(options);
    };
  };

  if (typeof module == "object"){
    module.exports = this.Model;
  }

}();