import css from './dashboard.css';

import React from 'react';


export default class Dashboard extends React.Component {
  render() {
    return (
      <div className={css.container}>
        This is a dashboard.
      </div>
    );
  }
}

