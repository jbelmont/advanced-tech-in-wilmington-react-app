'use strict';

const foo = () => {
  return new Error('Foo');
};

global.td = require('testdouble');
exports.td = global.td;

exports.foo = foo;
