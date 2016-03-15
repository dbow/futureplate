import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory, match} from 'react-router';

import IndexStore from 'src/stores/index';
import routes from 'src/routes';
import {getDependencies} from 'src/utils/index';
import {FluxContext} from 'src/utils/wrappers';


let store = new IndexStore();
store.initialize(window.data);

let currentRoutes = routes;

// Get route dependencies whenever a route component is rendered.
const routeHandler = (Component, props) => {
  getDependencies([props.route], store, props.params);
  return <Component {...props} />;
};

function renderAll() {
  match({currentRoutes, location}, () => {
    render((
      <FluxContext store={store}>
        <Router routes={routes} history={browserHistory} createElement={routeHandler} />
      </FluxContext>
    ), document.getElementById('app'));
  });
}

renderAll();


if (module.hot) {
  module.hot.accept('src/routes', () => {
    currentRoutes = require('src/routes').default;
    renderAll();
  });

  module.hot.accept('src/stores/index', () => {
    const NewIndexStore = require('src/stores/index');
    const data = store.serialize();

    store = new NewIndexStore();
    store.initialize(data);

    renderAll();
  });
}

