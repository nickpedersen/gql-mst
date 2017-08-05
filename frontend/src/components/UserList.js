import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import './UserList.css';

const UserList = observer(
  class UserList extends Component {
    componentDidMount() {
      const { store } = this.props;
      store.fetch();
    }
    render() {
      const { users } = this.props;
      return (
        <ul className="UserList">
          {users.map(user => <User key={user.id} {...user} />)}
        </ul>
      );
    }
  }
);

const User = observer(
  class User extends Component {
    render() {
      const { id, name, age } = this.props;
      return (
        <li className="UserList__user">
          {name}
          <pre>
            id: {id}<br />
            name: {name}<br />
            age: {age}
          </pre>
        </li>
      );
    }
  }
);

export default inject(stores => ({
  users: stores.store.usersStore.users,
  store: stores.store.usersStore,
}))(UserList);
