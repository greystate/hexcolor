HexColor
========

This is a JavaScript class that can be used when dealing with HexColors.
I wrote it for a specific project, but thought it could come in handy for
others too.

Usage
-----

You can initialize an instance either by passing in a color hexcode, or you
can leave it off to get a random color:

```javascript
const pieColor = new HexColor('#314159')
const randColor = new HexColor()
```

With those at hand you can start inspecting them:

```javascript
const long = pieColor.color              // >> '#314159'
const short = pieColor.shorten()         // >> '#345'
const longValues = pieColor.toRGB()      // >> [49, 65, 89]
const shortValues = pieColor.toRGB(true) // >> [48, 64, 80]
```

_More API & usage stuff coming soon_


Tests
-----

There's a bunch of [tests][] available for the curious - actually,
if you feel like learning a new language, grab the tests and rewrite them for
that language.  
Then implement `HexColor` using the tests as a guide.


[tests]: test/spec/hexcolor-spec.js
