import css from './things.css';

import React from 'react';


export default class Things extends React.Component {
  render() {
    return (
      <div className={css.div}>
        {this.props.children}
      </div>
    );
  }
}

