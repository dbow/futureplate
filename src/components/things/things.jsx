import styles from './things.css';

import React from 'react';


export default class Things extends React.Component {
  render() {
    return (
      <div className={styles.div}>
        {this.props.children}
      </div>
    );
  }
}

