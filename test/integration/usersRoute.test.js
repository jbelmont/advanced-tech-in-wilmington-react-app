'use strict';

const test = require('ava');
const {join} = require('path');
const nock = require('nock');

const {
    responseCodes,
    requestURL,
    endPoints
} = require(join(__dirname, '../../constants'));

const {
  addUserUrl,
  removeUserUrl
} = endPoints;

const request = require('supertest');

let postScope, payload, deleteScope;
test.before(() => {
  const requestGetHeaders = {
    reqheaders: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };

  payload = {
    'user': {
      'email': 'bigkahuna@surfsup.com',
      'first_name': 'Big',
      'gender': 'Male',
      'id': 57,
      'last_name': 'Kahuna'
    }
  };

  postScope = nock(requestURL, requestGetHeaders)
              .get(addUserUrl)
              .reply(201, payload);

  deleteScope = nock(requestURL)
                .delete(removeUserUrl)
                .reply(204);
});

test.after('cleanup', () => {
  nock.cleanAll();
});

test.cb('add user url should return 201 response and the newly added user', t => {
  t.plan(3);
  const created = responseCodes['created'];
  const req = request.agent(requestURL);
  req
    .get(addUserUrl)
      .set({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
      .expect(res => {
        t.is(res.status, created, '201 Status Code should be returned');
        t.deepEqual(res.body, payload);
      })
      .end(() => {
        t.is(postScope.isDone(), true, `POST ${addUserUrl} Nock Spy called`);
        t.end();
      });
});

test.cb('remove user url should return 204 response', t => {
  t.plan(2);
  const nocontent = responseCodes['nocontent'];
  const req = request.agent(requestURL);
  req
    .del(removeUserUrl)
      .expect(res => {
        t.is(res.status, nocontent, '204 Status Code should be returned');
      })
      .end(() => {
        t.is(deleteScope.isDone(), true, `DELETE ${removeUserUrl} Nock Spy called`);
        t.end();
      });
});
