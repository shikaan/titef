# Titef recipes

**Titef** was built with a very clear and simple idea in mind: testing is
boring and it should be as easier as possible for the developer.

To make this true we built this collection of recipes meant to be a 
vademecum for developers: most probably after two or three times you 
get the logic behind it and you won't need this anymore.

## Table of Contents
1. [Sync functions](./sync)
2. [Some paragraph](#paragraph1)
    1. [Sub paragraph](#subparagraph1)
3. [Another paragraph](#paragraph2)

## Assumptions
_Recipes assume_ the following basic knowledge:

- Basic understanding of how `Promise` works;
- Familiarity with ES6+ syntax;

It's a plus being familiar with `async/await` flow, but you can easily 
follow recipes without this knowledge. May this be the first good chance
to learn this pattern?

_Recipes do not assume_ anything about the assertion library: as long
as you're using something which throws an `AssertionError` when an 
assertion fails, you're good to go.

The following assertion liraries are hence supported:
- [assert](https://nodejs.org/api/assert.html);
- [chai](http://chaijs.com);
- [should.js](http://shouldjs.github.io);

If you want to stick with lightness of **Titef** we suggest to use Node
builtin `assert` library, but who are we to judge you?

## Other guides and learning material

TBD;
