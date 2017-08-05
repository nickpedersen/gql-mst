import { types } from 'mobx-state-tree';
import gql from 'graphql-tag';

import Task from '../models/Task.model';
import client from '../utils/graphql';

const TasksStore = types.model(
  {
    tasks: types.array(Task),
  },
  {
    fetch() {
      const query = gql`
      {
        tasks {
          id,
          title,
          user {
            id
          },
          complete
        }
      }
    `;
      client.query({ query }).then(response => {
        this.hydrate(response.data);
      });
    },
    hydrate(data) {
      this.tasks = data.tasks.map(task => ({
        ...task,
        user: task.user.id,
      }));
    },
  }
);

export default TasksStore;
