#! /bin/bash

npx mocha -t 100000 ./test/performance/mocha.js

npx titef ./test/performance/titef.js

sleep 5