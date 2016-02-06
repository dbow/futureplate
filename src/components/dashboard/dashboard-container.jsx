import React from 'react';

import * as actions from 'src/actions/index';
import { subscribeToStore } from 'src/utils/wrappers';

import Dashboard from './dashboard.jsx';


const DEPENDENCIES = actions.getRandomNumber;

class DashboardContainer extends React.Component {
  render() {
    const state = this.context.store.stores.random.getState();
    const random = state && state.random;
    const props = {
      random,
    };
    return (
      <Dashboard {...props} />
    );
  }
}


export default subscribeToStore(DashboardContainer, DEPENDENCIES);

