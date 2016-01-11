import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';

import IndexStore from 'src/stores/index';
import routes from 'src/routes';
import { getDependencies } from 'src/utils/index';
import { FluxContext } from 'src/utils/wrappers';


const store = new IndexStore();

store.initialize(window.data);

// Get route dependencies whenever a route component is rendered.
const routeHandler = (Component, props) => {
  getDependencies([props.route], store, props.params);
  return <Component {...props} />
}

render((
  <FluxContext store={store}>
    <Router routes={routes} history={browserHistory} createElement={routeHandler} />
  </FluxContext>
), document.getElementById('app'));

