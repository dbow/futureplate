import styles from './dashboard.css';

import React from 'react';


export default(props) => (
  <div className={styles.container}>
    <h2>This is a dashboard.</h2>
    <div>{`Your random number is ${props.random}`}</div>
  </div>
);

