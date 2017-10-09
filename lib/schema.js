'use strict';

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');


const getMtaData = require('./get-mta-data');

const lineType = new GraphQLObjectType({
  name: 'line',
  description: '...',
  fields: () => ({
    name: {
      description: 'service line name',
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({ name }) => name
    },
    status: {
      description: 'service line status',
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({ status }) => status
    },
    text: {
      description: 'service line status',
      type: GraphQLString,
      resolve: ({ text }) => text
    },
    timestamp: {
      description: 'service line status',
      type: GraphQLString,
      resolve: ({ timestamp }) => timestamp
    }
  })
});

const query = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    status: {
      type: new GraphQLList(lineType),
      description: 'MTA Service Line Status\'',
      args: {
        line: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async(val, { line }) => {
        const data = await getMtaData();
        return data[line];
      }
    }
  })
});

const schema = new GraphQLSchema({
  query
});

module.exports = schema;
