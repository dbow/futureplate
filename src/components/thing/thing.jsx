import css from './thing.css';

import React from 'react';

import FluxComponent from 'src/flux/component.jsx';


class Thing extends React.Component {
  render() {
    const {store, params} = this.props;
    const id = parseInt(params.id, 10);
    const things = store.stores.things.getState();
    const thing = things && things[id] || {};
    return (
      <div className={css.default}>
        Thing { thing.id } : { thing.text }
      </div>
    );
  }
}


export default FluxComponent(Thing);

