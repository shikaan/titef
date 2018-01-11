# Titef
Tiny test framework for testing newbies.

### Why you should use it?
1. It has everything you need in most of the cases in an incredibly small size;
2. It has an almost flat learning curve if you're already familiar with other testing frameworks
like Mocha or Jasmine;
3. (opinionated) It has an almost flat learning curve even though you're not familiar with
other testing technologies but you're familiar with ES6+;
4. It's deadly simple. You can read the source and understand how it works in an hour;

## Getting started
Titef is completely agnostic regarding te assertion library you want to use, as soon as
it returns an `AssertionError` when an assertion fails.

For this introduction we'll use Node's `assert`.

Please note: every example you'll read in this documentation is available or at least
deeply inspired by what you find in the `test` folder of this project.
