require('dotenv').config();
const { ApolloServer } = require('apollo-server-micro');
const mongoose = require('mongoose');

const typeDefs = require('../graphql/typeDefs');
const resolvers = require('../graphql/resolvers');

// Connection to MongoDB Atlas for all queries/operations
mongoose
  .connect(process.env.MONGODB_MERNG_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB CONNECTED!'));


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req})=>({req}),
  introspection: true,
  playground: true,
  engine: {
    apiKey: process.env.ENGINE_API_KEY
  }
});

module.exports = server.createHandler({ path: '/api' });
