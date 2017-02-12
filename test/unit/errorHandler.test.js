'use strict';

const test = require('ava');

const errorHandler = require('../../errorHandler');

test('check error object returned from errorHandler with no arguments', t => {
  t.plan(1);
  t.throws(() => errorHandler.generateError({
    err: new Error('unauthorized access'),
    moduleName: 'access',
    statusCode: 401
  }), TypeError);
});

test('check error object from errorHandler with proper arguments', t => {
  t.plan(1);
  const foo = require('../helpers').foo();
  const actual = errorHandler.generateError({
    err: foo,
    moduleName: 'foo',
    statusCode: 'foo error'
  });
  const expected = {
    statusCode: 'foo error',
    message: 'Foo Error: Foo',
    errorLineAndColumn: 'foo:4:10)'
  };
  t.deepEqual(actual, expected, `should return ${expected}`);
});
