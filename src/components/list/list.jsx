import styles from './list.css';

import React from 'react';
import { Link } from 'react-router';

import FluxComponent from 'src/flux/component.jsx';


class List extends React.Component {
  render() {
    const things = this.props.store.stores.ids.getOddThings() || [];
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


export default FluxComponent(List);

