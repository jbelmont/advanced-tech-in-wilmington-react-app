'use strict';

const test = require('ava');
const td = require('../helpers').td;

test.before('setup', () => {
  const rethinkDbMock = {
    connect: () => Promise.resolve({}),
    dbList: () => {
      return {
        contains: () => {
          return {
            run: () => {
              return {
                then: () => Promise.resolve(true)
              };
            }
          };
        }
      };
    },
    run: () => Promise.resolve({}),
    dbCreate: {
      run: () => Promise.resolve(),
      then: () => Promise.resolve()
    },
    db: () => Promise.resolve({}),
    tableCreate: () => Promise.resolve({}),
    table: () => {
      return {
        count: () => {
          return {
            run: () => {
              return {
                then: () => Promise.resolve(true)
              };
            }
          };
        },
        run: () => {
          return {
            then: () => Promise.resolve()
          };
        }
      };
    },
    insert: () => Promise.resolve({})
  };
  td.replace('rethinkdb', rethinkDbMock);
});

test.after('teardown', () => {
  td.reset();
});

test('dbActions', t => {
  const dbActions = require('../../db').dbActions;
  t.notThrows(
    () => dbActions().then(values => values)
  );
});
