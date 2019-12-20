const users = [
  {
    id: "1",
    name: "David",
    email: "david@test.com",
    age: 29,
  },
  {
    id: "2",
    name: "Sarah",
    email: "sarah@test.com",
  },
  {
    id: "3",
    name: "Mike",
    email: "mike@test.com",
  },
];

const posts = [
  {
    id: "1",
    title: "first post",
    body: "this is the body of the first post",
    published: true,
    author: "1",
  },
  {
    id: "2",
    title: "second post",
    body: "this is the body of the second post",
    published: true,
    author: "1",
  },
  {
    id: "3",
    title: "third post",
    body: "this is the body of the third post",
    published: true,
    author: "2",
  },
];

const comments = [
  {
    id: "12",
    author: "1",
    text: "This is a great blog post!",
    post: "1",
  },
  {
    id: "13",
    author: "1",
    text: "This is a super great blog post!",
    post: "1",
  },
  {
    id: "14",
    author: "2",
    text: "Hey, this is an ok blog post!",
    post: "2",
  },
  {
    id: "15",
    author: "1",
    text: "This is a bad blog post?",
    post: "3",
  },
];

const db = {
  users,
  posts,
  comments,
};

export { db as default };
