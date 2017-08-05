import { types } from 'mobx-state-tree';
import uniqBy from 'lodash/uniqBy';

import Task from '../models/Task.model';

const TasksStore = types.model(
  {
    tasks: types.array(Task),
  },
  {
    merge(tasks) {
      this.tasks = uniqBy(
        this.tasks.concat(tasks).reverse(),
        t => t.id
      ).reverse();
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
