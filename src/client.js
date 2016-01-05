import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';

import store from 'stores/index';
import routes, { bindActions } from 'routes';


// Populate store with serialized data from server.
store().initialize(window.data);

// TODO(dbow): Implement a cache in the store so we know when data is already
// present without this firstRender thing.
// This also doesn't work when there are multiple routes with actions...
let firstRender = true;

const routeHandler = (Component, props) => {
  let actions = props.route.actions;
  if (firstRender) {
    firstRender = false;
  } else if (actions) {
    actions = bindActions([props.route], store(), props.params);

    // TODO(dbow): Add a blocking={actions} option?
    Promise.all(actions);
  }
  return <Component {...props} />
}

render((
  <Router routes={routes} history={browserHistory} createElement={routeHandler} />
), document.getElementById('app'));

