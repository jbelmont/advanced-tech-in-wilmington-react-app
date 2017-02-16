'use strict';

const express = require('express');
const router = express.Router();
const { join } = require('path');

const {
  getUserById
} = require(join(__dirname, '../db/crudOperations'));

/**
 * Setup Database Connection
 * Create Database, table and insert values if necessary
 * Else grab values from Recipes table to use for client
 */
const db = require(join(__dirname, '../db'));

db.dbActions()
  .then((values) => {
    const data = {
      users: JSON.stringify(values)
    };

    /* GET home page. */
    router.get('/', (req, res) => {
      res.render('index', data);
    });

    /* Route back to home page. */
    router.get('/user/:id', (req, res) => getUserById({ connect: null, id: req.params.id })
    .then((person) => {
      res.render('index', {
        users: JSON.stringify(person)
      });
    }));
  });

module.exports = router;
