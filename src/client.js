import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory, match} from 'react-router';

import IndexStore from 'src/stores/index';
import routes from 'src/routes';
import {getDependencies} from 'src/utils/index';

import FluxRoot from 'src/flux/root.jsx';


const store = new IndexStore();

store.initialize(window.data);

// Get route dependencies whenever a route component is rendered.
const routeHandler = (Component, props) => {
  getDependencies([props.route], store, props.params);
  return <Component {...props} />
}

match({routes, location }, () => {
  render((
    <FluxRoot store={store}>
      <Router routes={routes} history={browserHistory} createElement={routeHandler} />
    </FluxRoot>
  ), document.getElementById('app'));
})

