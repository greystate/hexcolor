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

What I *really* built this for, was to be able to do this:

```javascript
const color = new HexColor('#ff8000')    // >> '#ff8000'
const words = color.toDeSandro()         // >> 'middle saturated orange'
```

Because ever since I saw [David DeSandro's presentation][PRES] from
**dotCSS 2018**, I've not been able to forget about it.
It's a fantastic way of looking at color values.

[PRES]: https://www.youtube.com/watch?v=eqZqx6lRPe0



Tests
-----

There's a bunch of [tests][] available for the curious - actually,
if you feel like learning a new language, grab the tests and rewrite them for
that language; then implement `HexColor` using the tests as a guide.

> [!NOTE]
> To run the tests, you need to open the [`SpecRunner.html`][RUNNER] file from a local webserver;
> your IDE probably has a built-in way to do this; or an easy way to install an extension for it.

[tests]: test/spec/hexcolor-spec.js
[RUNNER]: test/SpecRunner.html
