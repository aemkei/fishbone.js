# Fishbone.js `c-{{{-<`

A super lightweight (½kb) JavaScript library with automatic method chaining, automatic context binding, event support and simple inheritance.

Version: 1.0.1

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
Model=function a(b,c,d,e){function f(){var a=this,f={};a.on=function(a,b){(f[a]||
(f[a]=[])).push(b)},a.trigger=function(a,b){for(var c=f[a],d=0;c&&d<c.length;)c
[d++](b)},a.off=function(a,b){for(d=f[a]||[];b&&(c=d.indexOf(b))>-1;)d.splice(c
,1);f[a]=b?d:[]};for(c in b)d=b[c],a[c]=typeof d=="function"?function(){return(
d=this.apply(a,arguments))===e?a:d}.bind(d):d;a.init&&a.init.apply(a,arguments)
}return f.extend=function(f){d={};for(c in b)d[c]=b[c];for(c in f)d[c]=f[c],b[c
]!==e&&(d["__"+c]=b[c]);return a(d)},f},typeof module=="object"&&(module.exports
=Model);                                                              // c-{{{-<

```

Install via [npm](https://npmjs.org/package/fishbone):

```sh
npm install fishbone
```

### Browser Support

Fishbone runs in all modern browsers and Node.js.

If you want support for Internet Explorer 8 and below, you have to include the 
`.bind` and `.indexOf` polyfills: [https://github.com/aemkei/fishbone.js/blob/master/polyfills.js](https://github.com/aemkei/fishbone.js/blob/master/polyfills.js)

### About

Developed by [Martin Kleppe](https://plus.google.com/103747379090421872359) at [Ubilabs](http://www.ubilabs.net).

Released under the [WTFPL](http://en.wikipedia.org/wiki/WTFPL) license.