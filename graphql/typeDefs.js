const { gql } = require('apollo-server-micro');


// The GraphQL API: All Queries, Mutations, Subs available:
module.exports = gql`
  type Post {
    id: ID
    body: String
    createdAt: String
    username: String
  }
  type User {
    id: ID
    name: String
  }
  type Query {
    getPosts: [Post]
    getUsers: [User]
  }
`;
