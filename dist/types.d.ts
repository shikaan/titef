// Type definitions for titef
// Definitions by: Manuel Spagnolo <spagnolo.manu@gmail.com>

declare namespace titef {
  export interface SuiteOptions {
    silent?: boolean,
    setup?: () => void,
    teardown?: () => void,
    eachSetup?: () => void,
    eachTeardown?: () => void
  }

  interface SpecFunction {
    (name: string, callback?: Function): void;
  }

  interface SuiteFunction {
    (name: string, options: SuiteOptions, callback?: Function): void;

    (name: string, callback?: Function): void;
  }

  declare var describe: titef.SuiteFunction;
  declare var suite: titef.SuiteFunction;

  declare var xit: titef.SpecFunction;
  declare var it: titef.SpecFunction;
  declare var test: titef.SpecFunction;
  declare var xtest: titef.SpecFunction;
  declare var spec: titef.SpecFunction;
  declare var xspec: titef.SpecFunction;
}

declare var describe: titef.SuiteFunction;
declare var suite: titef.SuiteFunction;

declare var xit: titef.SpecFunction;
declare var it: titef.SpecFunction;
declare var test: titef.SpecFunction;
declare var xtest: titef.SpecFunction;
declare var spec: titef.SpecFunction;
declare var xspec: titef.SpecFunction;

export = titef;