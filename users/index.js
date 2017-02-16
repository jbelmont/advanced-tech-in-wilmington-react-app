'use strict';

const express = require('express');
const router = express.Router();

const {
  insertDocument
} = require('../db/crudOperations');

router.post('/addUser', (req, res) => {
  const {
    user
  } = req.body;
  return insertDocument({ connect: null, user: user })
    .then(() => {
      res.send(user);
    })
    .catch(err => err);
});

module.exports = router;
