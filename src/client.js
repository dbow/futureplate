import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import {Router, browserHistory, match} from 'react-router';
import {trigger} from 'redial';

import IndexStore from 'src/stores/index';
import routeConfig from 'src/routes';

import FluxRoot from 'src/flux/root.jsx';


let store = new IndexStore();
let routes = routeConfig;

const root = document.getElementById('app');

store.initialize(window.data);

browserHistory.listen(location => {
  match({routes, location}, (error, redirectLocation, props = {}) => {
    const {components, params} = props;
    if (window.data) {
      delete window.data;
    } else {
      trigger('fetch', components, {store, params});
    }
  });
});


function init() {
  render((
    <FluxRoot store={store}>
      <Router routes={routes} history={browserHistory} />
    </FluxRoot>
  ), root);
}

match({routes, location}, () => {
  init();
})


// Hot Module Replacement.
if (module.hot) {
  module.hot.accept('src/routes', () => {
    routes = require('src/routes').default;
    unmountComponentAtNode(root);
    init();
  });

  module.hot.accept('src/stores/index', () => {
    const NewIndexStore = require('src/stores/index').default;
    const data = store.serialize();
    store = new NewIndexStore();
    store.initialize(data);
    unmountComponentAtNode(root);
    init();
  });
}

