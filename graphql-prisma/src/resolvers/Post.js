const Post = {
  // Parent here is the parent post. GraphQL will see there is no author in posts and look to the Post resolver.
  author(parent, args, { db }, info) {
    return db.users.find(user => {
      return user.id === parent.author;
    });
  },
  comments(parent, args, { db }, info) {
    return db.comments.filter(comment => comment.post === parent.id);
  },
};

export { Post as default };
