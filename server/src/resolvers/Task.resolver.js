import User from '../connectors/User.connector';

const resolvers = {
  Task: {
    user: task => {
      return User.fetchById(task.user);
    },
  },
};

export default resolvers;
