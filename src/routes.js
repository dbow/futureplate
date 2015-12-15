import _ from 'lodash';
import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'components/app.jsx';
import Dashboard from 'components/dashboard.jsx';
import About from 'components/about.jsx';
import Things from 'components/things.jsx';
import ListOfThings from 'components/list.jsx';
import Thing from 'components/thing.jsx';

import * as actions from 'actions/index';


export function bindActions(routes, store, params) {
  return _.reduce(routes, (result, route) => {
    let actions = route.actions;
    if (actions) {
      if (!_.isArray(actions)) {
        actions = [route.actions];
      }
      result = result.concat(_.map(actions, (action) => {
        return action(store, params);
      }));
    }
    return result;
  }, []);
}

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Dashboard} />
    <Route path='about' component={About} />
    <Route path='list' component={Things} actions={actions.getIds}>
      <IndexRoute component={ListOfThings} />
      <Route path='thing/:id' component={Thing} actions={actions.getThing} />
    </Route>
  </Route>
);

