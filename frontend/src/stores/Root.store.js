import { types } from 'mobx-state-tree';
import { normalize, schema } from 'normalizr';
import values from 'lodash/values';

import client from '../utils/graphql';
import TasksStore from './Tasks.store';
import UsersStore from './Users.store';

const user = new schema.Entity('users');
const task = new schema.Entity('tasks', {
  user: user,
});
const rootQuery = new schema.Entity('query', {
  users: [user],
  tasks: [ task ],
});

const Store = types.model(
  {
    usersStore: UsersStore,
    tasksStore: TasksStore,
  },
  {
    executeGraphQL(query) {
      client.query({ query }).then(response => {
        const normalizedData = normalize(response.data, rootQuery);
        if (normalizedData.entities.users) {
          console.log('INSERTING USERS', values(normalizedData.entities.users));
          this.usersStore.merge(values(normalizedData.entities.users));
        }
        if (normalizedData.entities.tasks) {
          console.log('INSERTING TASKS', values(normalizedData.entities.tasks));
          this.tasksStore.merge(values(normalizedData.entities.tasks));
        }
      });
    }
  }
);

export default Store;
