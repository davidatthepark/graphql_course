import { GraphQLServer } from 'graphql-yoga'

// Demo user data
const users = [
  {
    id: '1',
    name: 'David',
    email: 'david@test.com',
    age: 29,
  },
  {
    id: '2',
    name: 'Sarah',
    email: 'sarah@test.com',
  },
  {
    id: '3',
    name: 'Mike',
    email: 'mike@test.com',
  },
]

const posts = [
  {
    id: '1',
    title: 'first post',
    body: 'this is the body of the first post',
    published: true,
  },
  {
    id: '2',
    title: 'second post',
    body: 'this is the body of the second post',
    published: false,
  },
  {
    id: '3',
    title: 'third post',
    body: 'this is the body of the third post',
    published: true,
  },
]

// Type definition (schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    me: User!
    post: Post!
    posts(query: String): [Post!]!
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
    users(parent, args) {
      if (!args.query) {
        return users
      }

      return users.filter(user => {
        return user.name.toLowerCase().includes(args.query.toLowerCase())
      })
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
    posts(parent, args) {
      if (!args.query) {
        return posts
      }

      return posts.filter(isTitleOrBodyMatching)

      function isTitleOrBodyMatching({ title, body }) {
        const isTitleMatching = title.toLowerCase().includes(args.query)
        const isBodyMatching = body.toLowerCase().includes(args.query)

        return isTitleMatching || isBodyMatching
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
