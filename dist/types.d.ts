declare namespace Titef {
  interface SuiteOptions {
    silent?: boolean,
    setup?: () => void,
    teardown?: () => void,
    eachSetup?: () => void,
    eachTeardown?: () => void
  }

  var xit: (name: string, callback: Function) => void;
  var it: (name: string, callback: Function) => void;
  var test: (name: string, callback: Function) => void;
  var xtest: (name: string, callback: Function) => void;
  var spec: (name: string, callback: Function) => void;
  var xspec: (name: string, callback: Function) => void;

  var suite: {
    (name: string, callback: Function): void;
    (name: string, options: SuiteOptions, callback: Function): void;
  }

  var describe: {
    (name: string, callback: Function): void;
    (name: string, options: SuiteOptions, callback: Function): void;
  }
}

export = Titef;
