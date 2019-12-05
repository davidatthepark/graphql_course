import { GraphQLServer } from "graphql-yoga";
import database from "./db";
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import User from "./resolvers/User";
import Post from "./resolvers/Post";
import Comment from "./resolvers/Comment";

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Query,
    Mutation,
    Post,
    User,
    Comment,
  },
  context: {
    db: database,
  },
});

server.start(() => {
  console.log("The server is up on port 4000!");
});
