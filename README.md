# Fishbone.js

A super lightweight JavaScript library - made for hungy pirates.

### Features

* simple constructor
* event observer pattern
* scoped methods
* for browser & Node.js
* no bullshit
* only 400 bytes minified

### Usage

* `Model({ init: function(options){} })` - create a model
* `new Model(options)` - create an instance
* `#on(event, listener)` - observe a given event
* `#off(event, [listener])` - remove listener
* `#trigger(event, data)` - triggers an event

### Example

```js
var Pirate = Model({
  init: function(name){
    this.name = name;
    this.grogs = 0;
  },

  drink: function(){
    this.grogs++;
    if (this.grogs > 100){
      this.trigger("drunk");
    }
  },
  sing: function(){
    console.log("ARR: " + this.name + " WANT MORE!");
  }
});

var jack = new Pirate("Jack");

jack.on("drunk", jack.sing);

for (var i=0; i<110; i++){
  jack.drink();
}
``

### Install

Copy and paste this:

```js
function Model(a){return function(b){var c=this,d={},e,f;c.on=function(a,b){
var c=d[a]||(d[a]=[]);c.push(b)},c.trigger=function(a,b){for(var c=d[a],e=0;
c&&e<c.length;e++)c[e](b)},c.off=function(a,b){for(var c=d[a]||[],e;b&&(e=c.
indexOf(b))>-1;)c.splice(e,1);d[a]=c};for(f in a)e=a[f],a.hasOwnProperty(f)
&&typeof e=="function"&&(c[f]=e.bind(c));c.init(b)}}typeof module=="object"
&&(module.exports=Model);
```

### Todo

Add simple chaining by comparing return values with `undefined`.


### About

Developed by [Martin Kleppe](https://plus.google.com/103747379090421872359) at [Ubilabs](http://www.ubilabs.net).

Released under the [WTFPL](http://en.wikipedia.org/wiki/WTFPL) license.