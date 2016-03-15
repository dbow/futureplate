import styles from './list.css';

import React from 'react';
import { Link } from 'react-router';

import { subscribeToStore } from 'src/utils/wrappers';


class List extends React.Component {
  render() {
    const things = this.context.store.stores.ids.getOddThings() || [];
    return (
      <div>
        { things.map(thing => (
          <li key={thing}>
            <Link className={styles.link} to={`list/thing/${thing}`}>{thing}</Link>
          </li>
        )) }
        List
      </div>
    );
  }
}


export default subscribeToStore(List);

