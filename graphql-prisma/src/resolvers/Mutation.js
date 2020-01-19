import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const Mutation = {
  // info will return the info we requested
  async createUser(parent, args, { prisma }, info) {
    if (args.data.password.length < 8) {
      throw new Error("Password must be 8 characters or longer.");
    }

    // Bcrypt's second argument is a salt
    // A salt is a random series of characters that are hashed along
    // with the string you are hashing. It is more secure.
    const password = await bcrypt.hash(args.data.password, 10);
    const user = await prisma.mutation.createUser({
      data: {
        ...args.data,
        password,
      },
    });

    return {
      user,
      token: jwt.sign({ userId: user.id }, "thisisasecret"),
    };
  },
  deleteUser(parent, args, { prisma }, info) {
    return prisma.mutation.deleteUser({ where: { id: args.id } }, info);
  },
  updateUser(parent, { data, id }, { db }, info) {
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
  createPost(parent, args, { prisma, pubsub }, info) {
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
  deletePost(parent, args, { prisma, pubsub }, info) {
    return prisma.mutation.deletePost({ where: { id: args.id } }, info);
  },
  updatePost(parent, { id, data }, { prisma, pubsub }, info) {
    return prisma.mutation.updatePost(
      {
        where: { id },
        data,
      },
      info,
    );
  },
  createComment(parent, args, { prisma }, info) {
    return prisma.mutation.createComment(
      {
        data: {
          text: args.data.text,
          author: {
            connect: {
              id: args.data.author,
            },
          },
          post: {
            connect: {
              id: args.data.post,
            },
          },
        },
      },
      info,
    );
  },
  deleteComment(parent, args, { prisma }, info) {
    return prisma.mutation.deleteComment({ where: { id: args.id } }, info);
  },
  updateComment(parent, args, { prisma }, info) {
    return prisma.mutation.updateComment(
      {
        data: args.data,
        where: {
          id: args.id,
        },
      },
      info,
    );
  },
};

export { Mutation as default };
