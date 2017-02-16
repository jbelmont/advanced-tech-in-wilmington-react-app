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
  indexRouteUrl,
  getUserUrl
} = endPoints;

const request = require('supertest');

let getScope, getUserScope, getUserUrlWithId;
test.before(() => {
  const requestGetHeaders = {
    reqheaders: {
      'Accept': 'text/html'
    }
  };

  getScope = nock(requestURL, requestGetHeaders)
              .get(indexRouteUrl)
              .reply(200);

  getUserUrlWithId = `${getUserUrl}/19`;
  getUserScope = nock(requestURL, requestGetHeaders)
                  .get(getUserUrlWithId)
                  .reply(200);
});

test.after('cleanup', () => {
  nock.cleanAll();
});

test.cb('index route should return 200 response', t => {
  t.plan(2);
  const ok = responseCodes['ok'];
  const req = request.agent(requestURL);
  req
    .get(indexRouteUrl)
      .set({
        'Accept': 'text/html'
      })
      .expect(res => {
        t.is(res.status, ok, '200 Status Code should be returned');
      })
      .end(() => {
        t.is(getScope.isDone(), true, `GET ${indexRouteUrl} Nock Spy called`);
        t.end();
      });
});

test.cb('get user url should return 200 response', t => {
  t.plan(2);
  const ok = responseCodes['ok'];
  const req = request.agent(requestURL);
  req
    .get(getUserUrlWithId)
      .set({
        'Accept': 'text/html'
      })
      .expect(res => {
        t.is(res.status, ok, '200 Status Code should be returned');
      })
      .end(() => {
        t.is(getUserScope.isDone(), true, `GET ${getUserUrlWithId} Nock Spy called`);
        t.end();
      });
});
