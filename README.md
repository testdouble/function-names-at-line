# function-names-at-line

I was working on this [run test by line number
feature](https://github.com/testdouble/teenytest/issues/5) for
[teenytest](https://github.com/testdouble/teenytest), and needed a way to tell
what functions might be described by a given line number.

For example, say you have this file:

``` js
                        // 1
var foo = function () { // 2
  var baz = 'lol'       // 3
  function bar () {}    // 4
}                       // 5
                        // 6
```

And read the file into a string named `someSource`, then you can:

``` js
var functionNamesAtLine = require('function-names-at-line')

functionNamesAtLine(someSource, 1) // []
functionNamesAtLine(someSource, 2) // ['foo']
functionNamesAtLine(someSource, 3) // ['foo']
functionNamesAtLine(someSource, 4) // ['baz', 'foo']
functionNamesAtLine(someSource, 5) // ['foo']
functionNamesAtLine(someSource, 6) // []
```

This is a pretty naive implementation, focused just on getting basic (not nested)
names of functions.
