import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory, match} from 'react-router';
import {trigger} from 'redial';

import IndexStore from 'src/stores/index';
import routes from 'src/routes';

import FluxRoot from 'src/flux/root.jsx';


const store = new IndexStore();

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

match({routes, location}, () => {
  render((
    <FluxRoot store={store}>
      <Router routes={routes} history={browserHistory} />
    </FluxRoot>
  ), document.getElementById('app'));
})

