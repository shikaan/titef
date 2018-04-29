#! /bin/bash

echo "Mocha"
mocha -t 100000 --reporter min ./test/performance/spec.js

echo "Jest"
jest --testPathPattern=performance --reporters jest-silent-reporter

echo "Titef"
titef ./test/performance/spec.js

sleep 5
