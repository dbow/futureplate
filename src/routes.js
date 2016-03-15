import _ from 'lodash';
import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'src/components/app.jsx';
import Dashboard from 'src/components/dashboard/dashboard.jsx';
import About from 'src/components/about/about.jsx';
import Things from 'src/components/things/things.jsx';
import ListOfThings from 'src/components/list/list.jsx';
import Thing from 'src/components/thing/thing.jsx';

import * as actions from 'src/actions/index';

// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Dashboard} />
    <Route path="about" component={About} />
    <Route path='list' component={Things} dependencies={actions.getIds}>
      <IndexRoute component={ListOfThings} />
      <Route path='thing/:id' component={Thing} dependencies={actions.getThing} />
    </Route>
  </Route>
);

