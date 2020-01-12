# Commands

- `docker-compose up -d`
- `prisma deploy`

# Notes

## Prisma

We need a way to facilitate the communication from the server to the database. One option is to use a native driver but it is too low level. The next step up is an ORM like Sequelize or Mongoose. These allow us to model data, validate, and migrate data.

Prisma is a GraphQL ORM. It is database agnostic. It wraps the database and exposes a GraphQL API. It sits between the server and db. The server becomes a thin layer between the client and db. The node server passes the query from the client straight to Prisma.

### Docker with Prisma

- Docker lets us run Prisma on our own machines. The docker container is provided in place of some sort of CLI or GUI app that would be used to run Prisma locally. Running Prisma locally is not necessary and you could use Prisma cloud instead.

### Deleting data

- Two choices:
  - SET_NULL (default)
  - CASCADE

## Authentication

- Anyone can query or mutate data in our prisma API without authentication. We need to lock down our API aside from publicy available data such as published posts.
- This is one of the main reasons why we need a node.js server intermediary. We can lockdown the prisma API and use the node server to do things like authentication, sanitization, and validation. We want to restrict actions by roles, authentication, and more.
