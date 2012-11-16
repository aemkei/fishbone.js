# Fishbone.js `c-{{{-<`

A super lightweight (½kb) JavaScript library – made for hungy pirates.

### Features

* clean and simple syntax
* steep learning curve
* `this` is the context in all methods
* automatic method chaining
* `on`, `off` event observer pattern
* no dependencies
* cross browser & [Node.js](http://nodejs.org) support
* < 512 bytes minified (300 gzip)

### Usage

* `Model({ init: function(options){} })` - create a model
* `new Model(options)` - create an instance
* `#on(event, listener)` - observe a given event
* `#off(event, [listener])` - remove listener
* `#trigger(event, data)` - triggers an event

### Example

```js
var Model = require("./fishbone");              // require module (Node only)

var Pirate = Model({                            // simple class creator
  likes: "GROG",                                // instance properties
  init: function(name){                         // init is the main entrance
    this.name = name;                           // options can be passed
    this.grogs = 0;
  },
  drink: function(){                            // instance method
    if (++this.grogs >= 100){
      this.trigger("drunk");                    // trigger an event
    }
  },
  yell: function(){
    console.log("WANT MORE: " + this.likes);    // this is always in context
  }
});

var captain = new Pirate("Jack"),               // create an instance
  rounds = 20;

captain.on("drunk", captain.yell);              // add event listener

function neverbeingcalled(){                    // pseudo listener
  console.error("AAR!");
}

captain.on("drunk", neverbeingcalled);          // add event listener
captain.off("drunk", neverbeingcalled);         // remove event listener

while (rounds--){ 
  captain
    .drink()                                    // chaining FTW!
    .drink()                                    // chaining FTW!
    .drink()                                    // chaining FTW!
    .drink()                                    // chaining FTW!
    .drink();                                   // chaining FTW!
}
```

### Install

Copy and paste this:

```js
function Model(a){return function(b){var c=this,d={},e,f,g;c.on=function
(a,b){var c=d[a]||(d[a]=[]);c.push(b)},c.trigger=function(a,b){for(var c
=d[a],e=0;c&&e<c.length;e++)c[e](b)},c.off=function(a,b){for(var c=d[a]
||[],e;b&&(e=c.indexOf(b))>-1;)c.splice(e,1);d[a]=c};for(e in a)f=a[e],a.
hasOwnProperty(e)&&(c[e]=typeof f=="function"?function(){var a=this.apply
(c,arguments);return a===g?c:a}.bind(f):c[e]=f);c.init(b)}}typeof module
=="object"&&(module.exports=Model);
```

Install via [npm](https://npmjs.org/package/fishbone):

```sh
npm install fishbone
```


### About

Developed by [Martin Kleppe](https://plus.google.com/103747379090421872359) at [Ubilabs](http://www.ubilabs.net).

Released under the [WTFPL](http://en.wikipedia.org/wiki/WTFPL) license.