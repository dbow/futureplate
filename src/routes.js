import _ from 'lodash';
import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'components/app.jsx';
import Dashboard from 'components/dashboard.jsx';
import About from 'components/about/about.jsx';
import Things from 'components/things.jsx';
import ListOfThings from 'components/list.jsx';
import Thing from 'components/thing.jsx';

import * as actions from 'actions/index';


export default (
  <Route path='/' component={App}>
    <IndexRoute component={Dashboard} />
    <Route path='about' component={About} />
    <Route path='list' component={Things} dependencies={actions.getIds}>
      <IndexRoute component={ListOfThings} />
      <Route path='thing/:id' component={Thing} dependencies={actions.getThing} />
    </Route>
  </Route>
);

