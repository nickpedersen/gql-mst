import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import gql from 'graphql-tag';
import './TaskList.css';

const TaskList = observer(
  class TaskList extends Component {
    componentDidMount() {
      const { executeGraphQL } = this.props;
      const query = gql`
        {
          tasks {
            id,
            title,
            user {
              id,
              name,
              age,
            },
            complete
          }
        }
      `;
      executeGraphQL(query);
    }
    render() {
      const { tasks } = this.props;
      return (
        <ul className="TaskList">
          {tasks.map(task => <Task key={task.id} {...task} />)}
        </ul>
      );
    }
  }
);

const Task = observer(
  class Task extends Component {
    render() {
      const { id, title, complete, user } = this.props;
      return (
        <li className="TaskList__user">
          {title}
          <pre>
            id: {id}<br />
            title: {title}<br />
            complete: {complete ? 'true' : 'false'}<br />
            user: {user.name}
          </pre>
        </li>
      );
    }
  }
);

export default inject(stores => ({
  tasks: stores.store.tasksStore.tasks,
  executeGraphQL: stores.store.executeGraphQL,
}))(TaskList);
