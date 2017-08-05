import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import './App.css';
import RootStore from './stores/Root.store';

import UserList from './components/UserList';
import TaskList from './components/TaskList';

const store = RootStore.create(
  // start with an empty store
  {
    usersStore: { users: [] },
    tasksStore: { tasks: [] },
  },
  {}
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <div className="App__header">
            <h2>GQL-MST</h2>
          </div>
          <h2>Users</h2>
          <UserList />
          <h2>Tasks</h2>
          <TaskList />
        </div>
      </Provider>
    );
  }
}

export default App;
