import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from 'src/components/app.jsx';
import Things from 'src/components/things/things.jsx';
import List from 'src/components/list/list.jsx';
import Thing from 'src/components/thing/thing.jsx';
import DashboardContainer from 'src/components/dashboard/container.jsx';


// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)


export default (
  <Route path="/" component={App}>
    <Route path="about" getComponent={(location, cb) => {
        require.ensure([], () => {
          cb(null, require('src/components/about/about.jsx').default);
        });
      }}
    />
    <Route path="list" component={Things}>
      <IndexRoute component={List} />
      <Route path="thing/:id" component={Thing} />
    </Route>
    <IndexRoute component={DashboardContainer} />
  </Route>
);

