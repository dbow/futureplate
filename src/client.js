import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import store from 'stores/index';
import routes, { bindActions } from 'routes';


// Note(dbow): Specifically use HTML5 history API instead of default hash
//     history to properly pass routes to the server
//     reference: https://github.com/rackt/react-router/blob/master
//         /docs/guides/basics/Histories.md#createbrowserhistory
const history = createBrowserHistory();

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
  <Router routes={routes} history={history} createElement={routeHandler} />
), document.getElementById('app'));

