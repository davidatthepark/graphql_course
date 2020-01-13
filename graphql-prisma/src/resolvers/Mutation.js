import uuidv4 from "uuid/v4";

const Mutation = {
  createUser(parent, args, { prisma }, info) {
    // info will return the info we requested
    return prisma.mutation.createUser({ data: args.data }, info);
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
