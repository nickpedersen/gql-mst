import Task from '../connectors/Task.connector';
import User from '../connectors/User.connector';

const resolvers = {
  Query: {
    users: (root, args) => {
      return User.fetchAll();
    },
    userById: (root, args) => {
      return User.fetchById(args.id);
    },
    tasks: (root, args) => {
      return Task.fetchAll();
    },
  },
};

export default resolvers;
