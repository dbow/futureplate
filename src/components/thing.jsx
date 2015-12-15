import React from 'react';

import store from 'stores/index';
import { subscribeToStore } from 'utils/wrappers';


class Thing extends React.Component {
  render() {
    const id = parseInt(this.props.params.id, 10);
    const thing = store().getState().thingsById[id] || {};
    return (
      <div className="thing">
        Thing { thing.id } : { thing.text }
      </div>
    );
  }
}


export default subscribeToStore(Thing);

