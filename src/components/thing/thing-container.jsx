import React from 'react';

import * as actions from 'src/actions/index';
import { subscribeToStore } from 'src/utils/wrappers';

import Thing from './thing.jsx';


class ThingContainer extends React.Component {
  componentWillMount() {
    actions.getThing(this.context.store, this.props.params);
  }

  render() {
    const id = parseInt(this.props.params.id, 10);
    const things = this.context.store.stores.things.getState();
    const thing = things && things[id] || {};
    const props = {
      thing,
    };
    return (
      <Thing {...props} />
    );
  }
}


export default subscribeToStore(ThingContainer);


