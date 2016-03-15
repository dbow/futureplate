import styles from './thing.css';

import React from 'react';

import FluxComponent from 'src/flux/component.jsx';


class Thing extends React.Component {
  render() {
    const id = parseInt(this.props.params.id, 10);
    const things = this.props.store.stores.things.getState();
    const thing = things && things[id] || {};
    return (
      <div className={styles.default}>
        Things { thing.id } : { thing.text }
      </div>
    );
  }
}


export default FluxComponent(Thing);

