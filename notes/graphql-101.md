## What is GraphQL?

GraphQL is short for Graph Query Language. Instead of the server determining what data to send back to the client, the client decides with a query. It's not an implementation. It is a specification.

## Why use GraphQL?

1. GraphQL is fast
   - Can reduce multiple round trips to the server and fewer db calls.
2. GraphQL is flexible
   - A mobile app doesn't need to endpoints. It can request a different set of data that is fit for a slower network or smaller screen.
3. GraphQL is easy to use and simple to maintain
   - No need to version the api. The client can simply change its query. Also, it is self-documenting.

### Scalar types

A scalar type holds a single discrete value. Non-scalar types would be arrays or objects.

- String
- Boolean
- Int
- Float
- ID

These values are nullable by default. Add an exclamation to the schema properties to make them non-nullable.

### Custom types

Add your own type to type definitions.

### Operation arguments

Alows you to pass data

## Mutations

The mutation operator is how you create, update, delete data. This is as opposed to the query operation which allows you to read data.
