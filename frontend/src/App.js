import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import { onSnapshot } from 'mobx-state-tree';
import './App.css';
import RootStore from './stores/Root.store';

import UserList from './components/UserList';
import TaskList from './components/TaskList';
import StateRepresentation from './components/StateRepresentation';

const store = RootStore.create(
  // start with an empty store
  {
    usersStore: { users: [] },
    tasksStore: { tasks: [] },
  },
  {}
);

onSnapshot(store, snapshot => {
  console.log('SNAPSHOT', snapshot);
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      tab: null,
    };
  }
  render() {
    const { tab } = this.state;
    return (
      <Provider store={store}>
        <div className="App">
          <div className="App__header">
            <h2>GQL-MST</h2>
            <button onClick={() => this.setState({ tab: null })}>None</button>
            <button onClick={() => this.setState({ tab: 'tasks' })}>
              Tasks
            </button>
            <button onClick={() => this.setState({ tab: 'users' })}>
              Users
            </button>
            <button onClick={() => this.setState({ tab: 'both' })}>Both</button>
          </div>
          {(tab === 'users' || tab === 'both') &&
            <div>
              <h2>Users</h2>
              <UserList />
            </div>}
          {(tab === 'tasks' || tab === 'both') &&
            <div>
              <h2>Tasks</h2>
              <TaskList />
            </div>}
          <div>
            <h2>State Tree</h2>
            <StateRepresentation />
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
