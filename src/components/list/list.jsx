import styles from './list.css';

import React from 'react';
import { Link } from 'react-router';


export default (props) => {
  return (
    <div>
      { props.things.map(thing => (
        <li key={thing}>
          <Link className={styles.link} to={`list/thing/${thing}`}>{thing}</Link>
        </li>
      )) }
      List
    </div>
  );
}

