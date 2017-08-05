import Task from '../connectors/Task.connector';

const resolvers = {
  User: {
    tasks: user => {
      return Task.fetchByUser(user.id);
    },
  },
};

export default resolvers;
