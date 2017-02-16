'use strict';

const test = require('ava');
const {
  init,
  cleanup
} = require('ava-rethinkdb');

const r = require('rethinkdb');

const TEST_DATA = {
  advancedtech: {
    users: [
      {'email':'handersonj@about.com','first_name':'Harry','gender':'Male','id':20,'last_name':'Anderson'},
      {'email':'dpayne3@cdbaby.com','first_name':'Donna','gender':'Female','id':4,'last_name':'Payne'},
      {'email':'eelliott4@pen.io','first_name':'Emily','gender':'Female','id':5,'last_name':'Elliott'},
      {'email':'jtucker2@tripadvisor.com','first_name':'Jonathan','gender':'Male','id':3,'last_name':'Tucker'},
      {'email':'smedina1@addthis.com','first_name':'Sean','gender':'Male','id':2,'last_name':'Medina'},
      {'email':'tcox0@dion.ne.jp','first_name':'Timothy','gender':'Male','id':1,'last_name':'Cox'},
      {'email':'fwells16@google.es','first_name':'Frank','gender':'Male','id':43,'last_name':'Wells'},
      {'email':'hwallace5@latimes.com','first_name':'Howard','gender':'Male','id':6,'last_name':'Wallace'},
      {'email':'jjacksont@icq.com','first_name':'Jane','gender':'Female','id':30,'last_name':'Jackson'},
      {'email':'cmorriso@theglobeandmail.com','first_name':'Cheryl','gender':'Female','id':25,'last_name':'Morris'}
    ]
  }
};

const {
  insertDocument,
  deleteDocument,
  getUserById
} = require('../../db/crudOperations');

test.before(
  init(TEST_DATA)
);
test.after.always(cleanup);

test('Documents should exist', async t => {
  const connect = await r.connect({ db: 'advancedtech' });
  let results = await r.table('users').run(connect);
  let data = await results.toArray();
  t.truthy(data);
});

test('getUserById should return a user', async t => {
  const connect = await r.connect({ db: 'advancedtech' });
  const actual = await getUserById({ connect: connect, id: '4'});
  const expected = {
    'email':'dpayne3@cdbaby.com','first_name':'Donna','gender':'Female','id':4,'last_name':'Payne'
  };
  t.deepEqual(actual, expected);
});

test('insertDocument should create a new document to users table', async t => {
  const connect = await r.connect({ db: 'advancedtech' });
  const document = {
    'email':'johnrambo@badass.net','first_name':'John','gender':'Male','id': 51,'last_name':'Rambo'
  };
  await insertDocument({ connect: connect, user: document });
  const actual = await getUserById({ connect: connect, id: '51'});
  t.deepEqual(actual, document);
});

test('deleteDocument should remove document', async t => {
  const connect = await r.connect({ db: 'advancedtech' });
  const document = {
    'email':'handersonj@about.com','first_name':'Harry','gender':'Male','id':20,'last_name':'Anderson'
  };
  await deleteDocument({ connect: connect, user: document });
  const actual = await getUserById({ connect: connect, id: '20'});
  t.deepEqual(actual, undefined);
});
