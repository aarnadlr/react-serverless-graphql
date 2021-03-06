const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');

const typeDefs = gql`
  type Query {
    sayHi: String!
  }
`;

const resolvers = {
  Query: {
    sayHi: () => 'Hello world'
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen()
	.then(result=>{
		console.log('Server RUNNING!');
	})
