const Query = {
  // What is going on here?
  // A node server is started that has the context of prisma running on a container (localhost:4466). The prisma container is connected to our heroku postgres db.
  // When we query locally at localhost:4000, the node graphql server can pass the query to prisma.

  // parent, args, context, info
  users(parent, args, { db, prisma }, info) {
    const opArgs = {};

    if (args.query) {
      opArgs.where = {
        OR: [
          {
            name_contains: args.query,
          },
          {
            email_contains: args.query,
          },
        ],
      };
    }

    // The info argument contains everything about the query.
    // We return a promise.
    return prisma.query.users(opArgs, info);
  },
  me(parent, args, { db }, info) {
    return {
      id: "123098",
      name: "David",
      email: "test@mail.com",
    };
  },
  post(parent, args, { db }, info) {
    return {
      id: "123098",
      title: "Some Title",
      body: "Some body",
      published: true,
    };
  },
  posts(parent, args, { db, prisma }, info) {
    const opArgs = {};

    if (args.query) {
      opArgs.where = {
        OR: [{ title_contains: args.query }, { body_contains: args.query }],
      };
    }

    return prisma.query.posts(opArgs, info);
  },
  comments(parent, args, { db, prisma }, info) {
    return prisma.query.comments(null, info);
  },
};

export { Query as default };
