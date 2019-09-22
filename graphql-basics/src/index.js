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
    author: '1',
  },
  {
    id: '2',
    title: 'second post',
    body: 'this is the body of the second post',
    published: false,
    author: '1',
  },
  {
    id: '3',
    title: 'third post',
    body: 'this is the body of the third post',
    published: true,
    author: '2',
  },
]

const comments = [
  {
    id: '12',
    author: '1',
    text: 'This is a great blog post!',
  },
  {
    id: '13',
    author: '1',
    text: 'This is a super great blog post!',
  },
  {
    id: '14',
    author: '2',
    text: 'Hey, this is an ok blog post!',
  },
  {
    id: '15',
    author: '3',
    text: 'This is a bad blog post?',
  },
]

// Type definition (schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    me: User!
    post: Post!
    posts(query: String): [Post!]!
    comments: [Comment!]!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
  }
`

// Resolvers (functions to get data)
const resolvers = {
  Query: {
    users(parent, args, context, info) {
      if (!args.query) {
        return users
      }

      return users.filter(user => {
        return user.name.toLowerCase().includes(args.query.toLowerCase())
      })
    },
    me(parent, args, context, info) {
      return {
        id: '123098',
        name: 'David',
        email: 'test@mail.com',
      }
    },
    post(parent, args, context, info) {
      return {
        id: '123098',
        title: 'Some Title',
        body: 'Some body',
        published: true,
      }
    },
    posts(parent, args, context, info) {
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
    comments(parent, args, context, info) {
      return comments
    },
  },
  Post: {
    // Parent here is the parent post. GraphQL wiill see there is no author in posts and look to the Post resolver.
    author(parent, args, context, info) {
      return users.find(user => {
        return user.id === parent.author
      })
    },
  },
  User: {
    posts(parent, args, context, info) {
      return posts.filter(post => {
        return post.author === parent.id
      })
    },
    comments(parent, args, context, info) {
      return comments.filter(comment => comment.author === parent.id)
    },
  },
  Comment: {
    author(parent, args, context, info) {
      return users.find(author => author.id === parent.author)
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
