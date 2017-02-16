'use strict';

const winston = require('winston');
const express = require('express');
const router = express.Router();

const {
  insertDocument,
  deleteDocument,
  getUserById
} = require('../db/crudOperations');

const {
  responseCodes
} = require('../constants');

router.post('/addUser', (req, res) => {
  const {
    user
  } = req.body;
  return insertDocument({ connect: null, user: user })
    .then(() => {
      res.status(responseCodes['created']).send(user);
    })
    .catch(err => err);
});

router.delete('/removeUser/:id', (req, res) => {
  const {
    id
  } = req.params;
  return getUserById({ connect: null, id })
    .then(user => {
      return deleteDocument({ connect: null, user })
        .then(() => {
          res.sendStatus(responseCodes['nocontent']);
        })
        .catch(err => {
          winston.error(err);
        });
    });
});

module.exports = router;
