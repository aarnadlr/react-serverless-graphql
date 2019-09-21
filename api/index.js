require('dotenv').config();
const { ApolloServer, gql } = require('apollo-server-micro');

const books = [
  {
    title: 'Book title 1',
    author: 'Asher'
  },
  {
    title: 'Book title2',
    author: 'Charley'
  }
];

// The API: All Queries, Mutations, Subs available:
const typeDefs = gql`
  type Query {
    books:[Book]
  }
  type Book{
    title:String
    author:String
  }
`;

const resolvers = {
  Query: {
    books:()=>books
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  engine: {
    apiKey: process.env.ENGINE_API_KEY
  }
});

module.exports = server.createHandler({ path: '/api' });
