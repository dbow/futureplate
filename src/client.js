import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';

import store from 'stores/index';
import routes from 'routes';
import { getDependencies } from 'utils/index';


// Populate store with serialized data from server.
store().initialize(window.data);

// Get route dependencies whenever a route component is rendered.
const routeHandler = (Component, props) => {
  getDependencies([props.route], store(), props.params);
  return <Component {...props} />
}

render((
  <Router routes={routes} history={browserHistory} createElement={routeHandler} />
), document.getElementById('app'));

