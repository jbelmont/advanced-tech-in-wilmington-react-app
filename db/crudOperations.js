

const rethinkdb = require('rethinkdb');
const winston = require('winston');

const DB = {
  DATABASE_NAME: process.env.DATABASE_NAME || 'advancedtech',
  TABLE_NAME: process.env.TABLE_NAME || 'users',
  port: process.env.DB_PORT || 28015,
  connection: process.env.connection || null,
  host: process.env.DB_HOST || 'localhost'
};

function connectToRethinkDBServer() {
  return rethinkdb
        .connect({
          host: DB.host,
          port: DB.port,
          db: DB.DATABASE_NAME
        })
        .then((connect) => {
          DB.connection = connect;
          return connect;
        })
        .catch((error) => {
          winston.log('error', 'Database Connection Error', { error });
          return error;
        });
}

function insertDocument(user) {
  return connectToRethinkDBServer().then(connect => {
    rethinkdb
    .table(DB.TABLE_NAME)
    .insert(user)
    .run(connect);
  });
}

function getUserById(connect, id) {
  return rethinkdb
    .table(DB.TABLE_NAME)
    .filter({
      id: Number(id)
    })
    .run(connect)
    .then(cursor => cursor
        .toArray()
        .then(values => values[0]));
}

function crudAction({ method, id }) {
  switch (method) {
  case 'getUserById':
    return connectToRethinkDBServer().then(connect => getUserById(connect, id).then((person) => {
      return person;
    }));
  }
}

exports.crudAction = crudAction;
exports.insertDocument = insertDocument;
