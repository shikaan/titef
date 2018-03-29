#! /bin/bash

npx mocha -t 100000 --reporter min ./test/performance/mocha.js

jest --testPathPattern=performance --reporters jest-silent-reporter

npx titef ./test/performance/titef.js

sleep 5
