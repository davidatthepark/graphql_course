import { GraphQLServer } from 'graphql-yoga';

// Type definition (schema)
const typeDefs = `
  type Query {
    hello: String!
    name: String!
    location: String!
    bio: String!
  }
`;

// Resolvers (functions to get data)
const resolvers = {
  Query: {
    hello() {
      return 'This is my first query';
    },
    name() {
      return 'David Park';
    },
    location() {
      return 'San Francisco';
    },
    bio() {
      return 'I am a person';
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log('The server is up!');
});
