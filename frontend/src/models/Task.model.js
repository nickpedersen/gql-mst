import { types } from 'mobx-state-tree';
import User from './User.model';

const Task = types.model(
  'Task',
  {
    id: types.identifier(),
    title: types.string,
    complete: types.boolean,
    user: types.reference(User),
  },
  {
    // actions here
  }
);

export default Task;
