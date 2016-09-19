/**
 * This fils is the base file for the front-end unit tests.
 * From here, we will include all spec files and include vue files for code coverage.
 */

// Polyfill fn.bind() for PhantomJS
/* eslint-disable no-extend-native */
Function.prototype.bind = require('function-bind');

// require all test files (files that ends with .spec.js)
var testsContext = require.context('.', true, /\.spec$/);
testsContext.keys().forEach(testsContext);

