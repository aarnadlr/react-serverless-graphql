require('dotenv').config();
const { ApolloServer, gql } = require('apollo-server-micro');
const mongoose = require('mongoose');

const Post = require('../models/Post');
const User = require('../models/User');

mongoose
  .connect(process.env.MONGODB_MERNG_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB CONNECTED!'));


// The API: All Queries, Mutations, Subs available:
const typeDefs = gql`
	type Post  {
			id: ID
			body: String
			createdAt: String
			username: String
	}
  type Query {
    getPosts:[Post]
  }
`;

const resolvers = {
  Query: {
    getPosts: async () => {
    	try{
    		const Posts = await Post.find();
    		return Posts;
			}catch(e){
    		throw new Error(e);
			}
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
  }
});

module.exports = server.createHandler({ path: '/api' });
