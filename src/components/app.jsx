import './app.global.css';
import css from './app.css';

import React from 'react';
import {Link} from 'react-router';


export default (props) => {
  return (
    <div className={css.container}>
      <div>
        Hi world!
        <Link to="/about">About</Link>
        <Link to="/">Dashboard</Link>
        <Link to="/list">Things</Link>
      </div>
      <div>
        {props.children}
      </div>
    </div>
  );
}

