const Comment = {
  author(parent, args, { db }, info) {
    return db.users.find(author => author.id === parent.author);
  },
  post(parent, args, { db }, info) {
    return db.posts.find(post => post.id === parent.post);
  },
};

export { Comment as default };
