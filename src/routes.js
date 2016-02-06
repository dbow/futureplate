import _ from 'lodash';
import React from 'react';
import { Route, IndexRoute } from 'react-router';

import * as actions from 'src/actions/index';

import App from 'src/components/app.jsx';
import DashboardContainer from 'src/components/dashboard/dashboard-container.jsx';
import ListContainer from 'src/components/list/list-container.jsx';


// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)


export default (
  <Route path='/' component={App}>
    <IndexRoute component={DashboardContainer} />
    <Route path='about' getComponent={(location, cb) => {
      require.ensure([], () => {
        cb(null, require('src/components/about/about.jsx').default);
      });
    }} />
    <Route path='list' dependencies={actions.getIds} getChildRoutes={(location, cb) => {
      require.ensure([], (require) => {
        cb(null, [
          {
            path: 'thing/:id',
            getComponent(location, cb) {
              require.ensure([], () => {
                cb(null, require('src/components/thing/thing-container.jsx').default);
              });
            },
          }
        ]);
      });
    }}>
      <IndexRoute component={ListContainer} />
    </Route>
  }}>
  </Route>
);

