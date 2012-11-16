# Fishbone.js c-{{{-<`

A super lightweight (½kb) JavaScript library - made for hungy pirates.

### Features

* clean and simple constructor
* scoped instance methods
* event observer pattern
* automatic method chaining
* for browser & Node.js
* < 512 bytes minified (300 gzip)

### Usage

* `Model({ init: function(options){} })` - create a model
* `new Model(options)` - create an instance
* `#on(event, listener)` - observe a given event
* `#off(event, [listener])` - remove listener
* `#trigger(event, data)` - triggers an event

### Example

```js
var Model = require("./fishbone");

var Pirate = Model({
  init: function(name){
    this.name = name;
    this.grogs = 0;
  },
  drink: function(){
    if (++this.grogs >= 100){
      this.trigger("drunk");
    }
  },
  sing: function(){
    console.log("ARR: " + this.name + " WANT MORE!");
  }
});

var captain = new Pirate("Jack"),
  rounds = 20;

captain.on("drunk", captain.sing);

while (rounds--){ 
  captain.drink().drink().drink().drink().drink(); 
}
```

### Install

Copy and paste this:

```js
function Model(a){return function(b){var c=this,d={},e,f,g;c.on=function(a,b)
{var c=d[a]||(d[a]=[]);c.push(b)},c.trigger=function(a,b){for(var c=d[a],e=0;
c&&e<c.length;e++)c[e](b)},c.off=function(a,b){for(var c=d[a]||[],e;b&&(e=c.
indexOf(b))>-1;)c.splice(e,1);d[a]=c};for(f in a)e=a[f],a.hasOwnProperty(f)&&
typeof e=="function"&&(c[f]=function(){var a=this.apply(c,arguments);return a
===g?c:a}.bind(e));c.init(b)}}typeof module=="object"&&(module.exports=Model);
```


### About

Developed by [Martin Kleppe](https://plus.google.com/103747379090421872359) at [Ubilabs](http://www.ubilabs.net).

Released under the [WTFPL](http://en.wikipedia.org/wiki/WTFPL) license.