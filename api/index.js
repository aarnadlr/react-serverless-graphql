require('dotenv').config();
const { ApolloServer, gql } = require('apollo-server-micro')

// The API: Queries, Muts, Subs which are available:
const typeDefs = gql`
  type Query {
    hello: String,
    name: String,
    age: Int,
    color: String
  }
`

const resolvers = {
  Query: {
    hello: (root, args, context) => {
      return 'Hello world!';
    },
    name: (root, args, context) => {
      return 'Asher!';
    },
    age: (root, args, context) => {
      return 8;
    },
    color: (root, args, context) => {
      return 'navy blue!';
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
	engine: {
    apiKey: process.env.ENGINE_API_KEY
  },
})

module.exports = server.createHandler({ path: '/api' })
