# Fishbone.js `c-{{{-<`

A super lightweight (½kb) JavaScript library with automatic method chaining, automatic context binding, event support and simple inheritance.

Version: 0.9.9

### Features

* clean and simple syntax
* steep learning curve
* `this` is the context in all methods
* automatic method chaining
* simple inheritance
* `on`, `off` event observer pattern
* no dependencies
* production ready
* well tested
* cross browser & [Node.js](http://nodejs.org) support
* ~ 512 bytes minified (300 gzipped !)

### Usage

* `Klass = Model({ init: function(options){} })` - create a model
* `Klass2 = Klass.extend({ … })` - inherit from other class
* `instance = new Klass(options)` - create an instance
* `instance.on(event, listener)` - observe a given event
* `instance.off(event, [listener])` - remove listener
* `instance.trigger(event, data)` - triggers an event

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

Include `fishbone.js` or copy and paste this:

```js
Model=(eval("module")||{}).exports=function _(a,b,c,d){function e(){var e=this,
f={};e.on=function(a,b){c=f[a]||(f[a]=[]),c.push(b)},e.trigger=function(a,d){
for(c=f[a],b=0;c&&b<c.length;)c[b++](d)},e.off=function(a,d){for(c=f[a]||[];d&&
(b=c.indexOf(d))>-1;)c.splice(b,1);f[a]=d?c:[]};for(b in a)c=a[b],e[b]=typeof 
c=="function"?function(){return c=this.apply(e,arguments),c===d?e:c}.bind(c):c;
e.init&&e.init.apply(e,arguments)}return e.extend=function(d){c={};for(b in a)
c[b]=a[b];for(b in d)c[b]=d[b];return _(c)},e};                     // c-{{{-<
```

Install via [npm](https://npmjs.org/package/fishbone):

```sh
npm install fishbone
```


### About

Developed by [Martin Kleppe](https://plus.google.com/103747379090421872359) at [Ubilabs](http://www.ubilabs.net).

Released under the [WTFPL](http://en.wikipedia.org/wiki/WTFPL) license.