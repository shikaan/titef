## Spec

Specifications are basically functions: as long as no `AssertionError` is
thrown, the specification is assumed to be passed.

Given that, every `spec` should always contain one assertion in order to
be useful. Also, every `spec` is expected to live in a `suite`.

#### `spec(title: string, callback: function)`

| Parameter 	| Type          	        | Description                                              |
|-----------	|------------------------	|----------------------------------------------------------|
| title     	| `String`        	        | Title of the spec. It will be used to generate the report|
| callback  	| `Function` or `AsyncFunction` 	| Where you will host your assertions.                     |

#### `xspec(title: string, callback: function)`

Sometimes you maybe want to ignore certain test specifications. To do so
just add an `x` (as _exclude_) in front of you spec: `xspec`.

| Parameter 	| Type          	        | Description                                              |
|-----------	|------------------------	|----------------------------------------------------------|
| title     	| `String`        	        | Title of the spec. It will be used to generate the report|
| callback  	| `Function` or `AsyncFunction` 	| Where you will host your assertions.                     |


#### Remarks and caveats
In **Titef** any `spec` can be either synchronous or asynchronous. Be
careful though: once you use the `async` keyword, you don't have any
guarantee about the order of execution of specs! Make sure your specs
are independent before going for an `async` flow.

#### Example
 ```javascript
const { xspec, spec, suite } = require('titef');
const assert = require('assert');
const myClass = require('./my-class');

suite('myClass:myMethod', () => {
  spec('exists', () => {
    assert.ok(!!myClass.myMethod);
  })
  xspec('i am excluded', () => {
    assert.false(true);
  })
 })
```
