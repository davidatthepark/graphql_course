import uuidv4 from "uuid/v4";

const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    // info will return the info we requested
    return prisma.mutation.createUser({ data: args.data }, info);
  },
  async deleteUser(parent, args, { prisma }, info) {
    return prisma.mutation.deleteUser({ where: { id: args.id } }, info);
  },
  async updateUser(parent, { data, id }, { db }, info) {
    return prisma.mutation.updateUser(
      {
        where: {
          id: args.id,
        },
        data: args.data,
      },
      info,
    );
  },
  async createPost(parent, args, { prisma, pubsub }, info) {
    return prisma.mutation.createPost(
      {
        data: {
          title: args.data.title,
          body: args.data.body,
          published: args.data.published,
          author: {
            connect: {
              id: args.data.author,
            },
          },
        },
      },
      info,
    );
  },
  async deletePost(parent, args, { prisma, pubsub }, info) {
    // TODO
  },
  async updatePost(parent, { id, data }, { prisma, pubsub }, info) {
    // TODO
  },
  createComment(parent, args, { db, pubsub }, info) {
    const userExists = db.users.some(user => user.id === args.data.author);

    if (!userExists) {
      throw new Error("User not found");
    }

    const postExists = db.posts.some(
      post => post.id === args.data.post && post.published,
    );

    if (!postExists) {
      throw new Error("Post not found");
    }

    const comment = { id: uuidv4(), ...args.data };

    db.comments.push(comment);
    pubsub.publish(`comment ${args.data.post}`, {
      comment: {
        mutation: "CREATED",
        data: comment,
      },
    });

    return comment;
  },
  deleteComment(parent, args, { db, pubsub }, info) {
    const commentIndex = db.comments.findIndex(
      comment => comment.id === args.id,
    );

    if (commentIndex === -1) {
      throw new Error("Comment not found");
    }

    const [deletedComment] = db.comments.splice(commentIndex, 1);

    pubsub.publish(`comment ${deletedComment.post}`, {
      comment: {
        mutation: "DELETED",
        data: deletedComment,
      },
    });

    return deletedComment;
  },
  updateComment(parent, { id, data }, { db, pubsub }, info) {
    const comment = db.comments.find(comment => comment.id === id);

    if (!comment) {
      throw new Error("Comment not found");
    }

    if (data.text === "string") {
      comment.text = data.text;
    }

    pubsub.publish(`comment ${comment.post}`, {
      comment: {
        mutation: "UPDATED",
        data: comment,
      },
    });

    return comment;
  },
};

export { Mutation as default };
