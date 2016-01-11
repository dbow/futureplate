import _ from 'lodash';
import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'src/components/app.jsx';
import Dashboard from 'src/components/dashboard.jsx';
import About from 'src/components/about/about.jsx';
import Things from 'src/components/things.jsx';
import ListOfThings from 'src/components/list.jsx';
import Thing from 'src/components/thing.jsx';

import * as actions from 'src/actions/index';


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

