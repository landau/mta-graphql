'use strict';

const express = require('express');
const graphqlHTTP = require('express-graphql');
// const DataLoader = require('dataloader');

const schema = require('./lib/schema');

const app = express();

app.use('/graphql', graphqlHTTP(() => ({
  schema,
  context: {
  },
  graphiql: true
})));

app.listen(8080);
console.log('Started server at http://localhost:8080'); // eslint-disable-line no-console
