import styles from './thing.css';

import React from 'react';

import { subscribeToStore } from 'src/utils/wrappers';


class Thing extends React.Component {
  render() {
    const id = parseInt(this.props.params.id, 10);
    const things = this.context.store.stores.things.getState();
    const thing = things && things[id] || {};
    return (
      <div className={styles.default}>
        Thing { thing.id } : { thing.text }
      </div>
    );
  }
}


export default subscribeToStore(Thing);

