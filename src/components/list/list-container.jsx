import React from 'react';

import { subscribeToStore } from 'src/utils/wrappers';

import List from './list.jsx';


class ListContainer extends React.Component {
  render() {
    const things = this.context.store.stores.ids.getState() || [];
    const props = {
      things,
    };
    return (
      <List {...props} />
    );
  }
}


export default subscribeToStore(ListContainer);

