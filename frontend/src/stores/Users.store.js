import { types } from 'mobx-state-tree';
import uniqBy from 'lodash/uniqBy';

import User from '../models/User.model';

const UsersStore = types.model(
  {
    users: types.array(User),
  },
  {
    merge(users) {
      this.users = uniqBy(this.users.concat(users).reverse(), u => u.id).reverse();
    },
    hydrate(data) {
      this.users = data.users;
    },
  }
);

export default UsersStore;
