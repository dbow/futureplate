import React from 'react';
import { Link } from 'react-router';

import store from 'stores/index';
import { subscribeToStore } from 'utils/wrappers';


class List extends React.Component {
  render() {
    const things = store().getState().ids || [];
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

