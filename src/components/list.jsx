import React from 'react';
import { Link } from 'react-router';

import { subscribeToStore } from 'src/utils/wrappers';


class List extends React.Component {
  render() {
    const things = this.context.store.stores.ids.getState() || [];
    return (
      <div className="list">
        { things.map(thing => (
          <li key={thing}>
            <Link to={`list/thing/${thing}`}>{thing}</Link>
          </li>
        )) }
        List
      </div>
    );
  }
}


export default subscribeToStore(List);

