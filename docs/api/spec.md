## Spec

Specifications are basically functions: as long as no `AssertionError` is
thrown, the specification is assumed to be passed.

Given that, every `spec` should always contain one assertion in order to
be useful. Also, every `spec` is expected - but that's not mandatory -
to live in a `suite`.

#### `suite(title: string, options?: Options, callback: function)`

| Parameter 	| Type          	        | Description                                              |
|-----------	|------------------------	|----------------------------------------------------------|
| title     	| `String`        	        | Title of the spec. It will be used to generate the report|                	|
| callback  	| `Function|AsyncFunction` 	| Where you will host your assertions.                     |

##### Options
| Attribute 	| Type     | Description                                 |
|-----------	|--------- |-------------------------------------------- |
| setup     	| `Function` | What should happen _before_ the suite runs? |
| teardown   	| `Function` | What should happen _after_ the suite run?  |

#### Remark and caveats
In **Titef** any `spec` can be either synchronous or asynchronous. Be 
careful though: once you use the `async` keyword, you don't have any 
guarantee about the order of execution of specs! Make sure your specs
are independent before going for an `async` flow.

#### Example
 ```javascript
const { spec, suite } = require('titef');
const assert = require('assert');
const myClass = require('./my-class');

suite('myClass:myMethod', () => {
  spec('exists', () => {
    assert.ok(!!myClass.myMethod);
  })
 })
```
