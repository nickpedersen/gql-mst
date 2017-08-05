import { types } from 'mobx-state-tree';

import TasksStore from './Tasks.store';
import UsersStore from './Users.store';

const Store = types.model(
  {
    usersStore: UsersStore,
    tasksStore: TasksStore,
  },
  {}
);

export default Store;
