import React from 'react';
import ReactDOM, {render} from 'react-dom';
import {Router, browserHistory, match} from 'react-router';

import IndexStore from 'src/stores/index';
import routes from 'src/routes';
import {getDependencies} from 'src/utils/index';
import FluxRoot from 'src/flux/root.jsx';


let store = new IndexStore();
store.initialize(data);

let currentRoutes = routes;

// Get route dependencies whenever a route component is rendered.
const routeHandler = (Component, props) => {
  getDependencies([props.route], store, props.params);
  return <Component {...props} />;
};

function renderAll() {
  match({currentRoutes, location}, () => {
    render((
      <FluxRoot store={store}>
        <Router routes={currentRoutes} history={browserHistory} createElement={routeHandler} />
      </FluxRoot>
    ), document.getElementById('app'));
  });
}

renderAll();


if (module.hot) {
  module.hot.accept('src/routes', () => {
    // NOTE (kyle): i'm not sure if this is sound, but we'll never run HMR on prod
    currentRoutes = require('src/routes').default;
    ReactDOM.unmountComponentAtNode(document.getElementById('app'));
    store.cache.setPerma(true);
    renderAll();
    store.cache.setPerma(false);
  });

  module.hot.accept('src/stores/index', () => {
    const NewIndexStore = require('src/stores/index').default;
    const data = store.serialize();

    store = new NewIndexStore();
    store.initialize(data);

    ReactDOM.unmountComponentAtNode(document.getElementById('app'));
    store.cache.setPerma(true);
    renderAll();
    store.cache.setPerma(false);
  });
}

