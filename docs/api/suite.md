## Suite

Suites are containers for test specifications (see [specs](./specs)).

Along with their grouping function, suites have the fundamental role of 
allowing the developer to manage the development environment. This happens
through two phases: the **setup phase** which happens _before_ the actual 
test suite is run and the **teardown phase** which is supposed to happen
_after_.

In **Titef** you can control those phases via the configuration object
you will pass to the `suite` method.

#### `suite(title: string, options?: Options, callback: function)`

| Parameter 	| Type            	| Description                                                                     	|
|-----------	|------------------	|---------------------------------------------------------------------------------	|
| title     	| `String`        	| Title of the test suite. It will be used to generate the report                 	|
| options   	| `Options?`      	| This adds the setup and teardown phase to your test suite                       	|
| callback  	| `Function|AsyncFunction` 	| Where you will host your `specs`.  It runs after `setup` and before `teardown`. 	|

##### Options
| Attribute 	| Type       | Description                                 |
|-----------	|----------- |-------------------------------------------- |
| setup     	| `Function` | What should happen _before_ the suite runs? |
| teardown   	| `Function` | What should happen _after_ the suite run?  |

#### Remark and caveats
Although it's not mandatory, we strongly recommend to mark the `callback`
function as `async`: this will make your test battery run faster.

**Caution!**

If you choose to do so, please remember that async suites should be 
independent: as a matter of fact, you don't have any guarantee on 
the order of execution of `specs` contained in async suites!

#### Example

```javascript
const { suite } = require('titef');

suite(
  'My first test suite', 
  {
    setup() {
      console.log('I am setting up the environment!')
    },
    teardown() {
      console.log('Test suite ended. Should I report anything?')
    }
  },
  async () => {
    // Collection of specs
  })
```
