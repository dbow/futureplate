import css from './dashboard.css';

import React from 'react';


export default ({number}) => {
  return (
    <div className={css.container}>
      <h1>This is a dashboard.</h1>
      <div>Your number is {number}.</div>
    </div>
  );
};

