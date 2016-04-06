import _ from 'lodash';
import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from 'src/components/app.jsx';
import Dashboard from 'src/components/dashboard/dashboard.jsx';

import * as actions from 'src/actions/index';

// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

export default (
  <Route path='/' component={App} getChildRoutes={(location, cb) => {
    require.ensure([], (require) => {
      cb(null, [
        {
          path: 'about',
          getComponent(location, cb) {
            require.ensure([], () => {
              cb(null, require('src/components/about/about.jsx').default);
            });
          }
        },
        {
          path: 'list',
          getComponent(location, cb) {
            require.ensure([], () => {
              cb(null, require('src/components/things/things.jsx').default);
            });
          },
          dependencies: actions.getIds,
          getChildRoutes(location, cb) {
            require.ensure([], (require) => {
              cb(null, [
                {
                  path: 'thing/:id',
                  getComponent(location, cb) {
                    require.ensure([], () => {
                      cb(null, require('src/components/thing/thing.jsx').default);
                    });
                  },
                  dependencies: actions.getThing,
                }
              ]);
            });
          },
          getIndexRoute(location, cb) {
            require.ensure([], (require) => {
              cb(null, {
                getComponent(location, cb) {
                  require.ensure([], () => {
                    cb(null, require('src/components/list/list.jsx').default);
                  });
                }
              });
            });
          }
        }
      ]);
    });
  }}>
    <IndexRoute component={Dashboard} />
  </Route>
);

