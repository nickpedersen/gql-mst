import { types } from 'mobx-state-tree';
import gql from 'graphql-tag';

import User from '../models/User.model';
import client from '../utils/graphql';

const UsersStore = types.model(
  {
    users: types.array(User),
  },
  {
    fetch() {
      const query = gql`
      {
        users {
          id,
          name,
          age
        }
      }
    `;
      client.query({ query }).then(response => {
        this.hydrate(response.data);
      });
    },
    hydrate(data) {
      this.users = data.users;
    },
  }
);

export default UsersStore;
