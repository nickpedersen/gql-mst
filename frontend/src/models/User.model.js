import { types } from 'mobx-state-tree';

const User = types.model(
  'User',
  {
    id: types.identifier(),
    name: types.string,
    age: types.number,
  },
  {
    // actions here
  }
);

export default User;
