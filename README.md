<p align="center">
  <img src="https://preview.ibb.co/dBFOtc/logo.png" alt="Titef logo"/>
</p>

![NPM](https://nodei.co/npm/titef.png?downloads=true&downloadRank=true&stars=true)

![Build Status](https://travis-ci.org/shikaan/titef.svg?branch=master)
![npm version](https://badge.fury.io/js/titef.svg)

🌠 A tiny, lightning-fast, zero-dependecies JavaScript test framework 🌠

### 🎯 Why you should use it?

⚡ Unbelievably fast (check it [here](https://shikaan.github.io/titef/performance/))

👌 ~2.9Kb (gzipped) of whatever you need in most of the cases

🏄 Close-to-zero migration effort from Mocha, Jasmine, Jest;

📖 Lots of docs make it user and contributor friendly

## 📥 Installation

```bash
npm install --save titef
```

## 👓 Usage

```bash
npx titef test/awesome.specs.js
```

Older npm:

```bash
node_modules/.bin/titef test/awesome.specs.js
```

## 👣 Getting started

Your first test file

```ecmascript 6
// test.js

const assert = require('assert');

const truthy = () => true;

suite('truthy', () => {
  spec('should return true', () => {
    assert.ok(truthy());
  });
  
  spec('should not return false', () => {
    assert.notDeepEqual(truthy(), false);
  });
});
```

Your first test run

```bash
$ npx titef ./test.js
```

For further information about writing and running tests in Titef 
take a look at 
[Titef: Recipes](https://shikaan.github.io/titef/recipes/) to 
get up and running in no time.


## 🎁 Contributing

Contributors are well welcomed!

[Here](./.github/CONTRIBUTING.md) you'll find all the information you
need to start to get going. A small preview:

- [API docs](https://shikaan.github.io/titef/api/)
- [developer documentation](./lib/README.md)
