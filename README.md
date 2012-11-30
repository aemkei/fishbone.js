# Fishbone.js `c-{{{-<`

A super lightweight (½kb) JavaScript library – made for hungy pirates.

Version: 0.9.6

### Features

* clean and simple syntax
* steep learning curve
* `this` is the context in all methods
* automatic method chaining
* `on`, `off` event observer pattern
* no dependencies
* production ready
* well tested
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

var Captain = Pirate.extend({                   // simple inheritance
  likes: "STRONG GROG"
});

var captain = new Captain("Jack"),              // create an instance
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
function Model(a){return function(){var b=this,c={},d,e,f,g,h,i;b.on
=function(a,b){f=c[a]||(c[a]=[]),f.push(b)},b.trigger=function(a,b){
for(f=c[a],h=0;f&&h<f.length;h++)f[h](b)},b.off=function(a,b){for(f=
c[a]||[];b&&(h=f.indexOf(b))>-1;)f.splice(h,1);c[a]=b?f:[]};for(d in
a)e=a[d],a.hasOwnProperty(d)&&(b[d]=typeof e=="function"?function(){
return g=this.apply(b,arguments),g===i?b:g}.bind(e):e);b.init&&b.init
.apply(b,arguments)}}typeof module=="object"&&(module.exports=Model);
```

Install via [npm](https://npmjs.org/package/fishbone):

```sh
npm install fishbone
```


### About

Developed by [Martin Kleppe](https://plus.google.com/103747379090421872359) at [Ubilabs](http://www.ubilabs.net).

Released under the [WTFPL](http://en.wikipedia.org/wiki/WTFPL) license.