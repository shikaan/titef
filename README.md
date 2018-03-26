# Titef
![NPM](https://nodei.co/npm/titef.png?downloads=true&downloadRank=true&stars=true)

![Build Status](https://travis-ci.org/shikaan/titef.svg?branch=master)
![npm version](https://badge.fury.io/js/titef.svg)

Tiny, zero-dependecies test framework for newbies.

It runs on top of NodeJS and it's meant to unit-test JavaScript
applications.

## Why you should use it?
1. It has everything you need in most of the cases in only ~8Kb;
2. It has an almost flat learning curve if you're already familiar with
other testing frameworks like Mocha, Jasmine, Jest;
3. It has an almost flat learning curve even though you're not familiar
with other testing technologies but you're familiar with ES6+;
4. It's deadly simple. You can read the source and understand how it
works in less than one hour;

## Installation

### Global
You can install Titef globally this way:
```bash
npm install -g titef
```
And then use it:

```bash
titef test/awesome.specs.js
```

### Local
You can install Titef as a dev dependency this way:
```bash
npm install --save-dev titef
```
Then you can use the command line interface this way:

```bash
node_modules/.bin/titef test/awesome.specs.js
```

or [better](https://github.com/zkat/npx)

```bash
npx titef test/awesome.specs.js
```

## Getting started

Usually [documentation](https://shikaan.github.io/titef) is the best
place to start. If you're really looking forward to testing right now,
you may want to take a look at
[Titef: Recipes](https://shikaan.github.io/titef/recipes/) to get up and
running in no time.


## Contributing

If you want to contribute, you'd better take a look
[here](./.github/CONTRIBUTING.md). There you can find all the
information you want to have and the links to
[API docs](https://shikaan.github.io/titef/api/) and to
[developer documentation](./lib/README.md).
Whops... you already have those!
