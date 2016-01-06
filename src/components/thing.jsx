import React from 'react';

import store from 'stores/index';
import { subscribeToStore } from 'utils/wrappers';


class Thing extends React.Component {
  render() {
    const id = parseInt(this.props.params.id, 10);
    const things = store().stores.things.getState();
    const thing = things && things[id] || {};
    return (
      <div className="thing">
        Thing { thing.id } : { thing.text }
      </div>
    );
  }
}


export default subscribeToStore(Thing);

