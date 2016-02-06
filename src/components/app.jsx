import './app.global.css';
import styles from './app.css';

import React from 'react';
import { Link } from 'react-router';


export default (props) => (
  <div>
    <div className="nav">
      Hi world!
      <Link to="/about">About</Link>
      <Link to="/">Dashboard</Link>
      <Link to="/list">Things</Link>
    </div>
    <div className={styles.container}>
      {props.children}
    </div>
  </div>
);

