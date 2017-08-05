import { makeExecutableSchema } from 'graphql-tools';
import merge from 'lodash/merge';

import Query from './resolvers/Query.resolver';
import Task from './resolvers/Task.resolver';
import User from './resolvers/User.resolver';

const typeDefs = `

  type User {
    id: ID!
    name: String
    age: Int
    tasks: [Task]
  }

  type Task {
    id: ID!
    title: String
    complete: Boolean
    user: User
  }

  type Query {
    users: [User]
    userById(id: ID!): User
    tasks: [Task]
  }

`;

const resolvers = merge({}, Query, Task, User);

export default makeExecutableSchema({ typeDefs, resolvers });
