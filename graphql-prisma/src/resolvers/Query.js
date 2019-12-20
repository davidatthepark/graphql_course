const Query = {
  users(parent, args, { db }, info) {
    if (!args.query) {
      return db.users;
    }

    return db.users.filter(user => {
      return user.name.toLowerCase().includes(args.query.toLowerCase());
    });
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
  posts(parent, args, { db }, info) {
    if (!args.query) {
      return db.posts;
    }

    return db.posts.filter(isTitleOrBodyMatching);

    function isTitleOrBodyMatching({ title, body }) {
      const isTitleMatching = title.toLowerCase().includes(args.query);
      const isBodyMatching = body.toLowerCase().includes(args.query);

      return isTitleMatching || isBodyMatching;
    }
  },
  comments(parent, args, { db }, info) {
    return db.comments;
  },
};

export { Query as default };
