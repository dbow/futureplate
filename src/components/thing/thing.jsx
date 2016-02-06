import styles from './thing.css';

import React from 'react';


export default (props) => (
  <div className={styles.default}>
    Thing { props.thing.id } : { props.thing.text }
  </div>
);

