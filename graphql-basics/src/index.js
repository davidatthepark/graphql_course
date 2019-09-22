import { GraphQLServer } from 'graphql-yoga'

// Type definition (schema)
const typeDefs = `
  type Query {
    add(a: Float!, b: Float!): Float!
    greeting(name: String): String
    me: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }
`

// Resolvers (functions to get data)
const resolvers = {
  Query: {
    add(parent, args) {
      return args.a + args.b
    },
    greeting(parent, args) {
      if (args.name) {
        return `Hello, ${args.name}!`
      }

      return 'Hello!'
    },
    me() {
      return {
        id: '123098',
        name: 'David',
        email: 'test@mail.com',
      }
    },
    post() {
      return {
        id: '123098',
        title: 'Some Title',
        body: 'Some body',
        published: true,
      }
    },
  },
}

const server = new GraphQLServer({
  typeDefs,
  resolvers,
})

server.start(() => {
  console.log('The server is up on port 4000!')
})
