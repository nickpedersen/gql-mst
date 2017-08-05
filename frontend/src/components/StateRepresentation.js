import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import './StateRepresentation.css';

const StateRepresentation = observer(
  class StateRepresentation extends Component {
    render() {
      const { store } = this.props;
      return (
        <pre className="StateRepresentation">
          {JSON.stringify(store.toJSON(), null, 2)}
        </pre>
      );
    }
  }
);

export default inject(stores => ({
  store: stores.store,
}))(StateRepresentation);
