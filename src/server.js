import express from 'express';
import _ from 'lodash';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';

import routes from '../build/server';
import IndexStore from './stores/index';
import { getDependencies } from './utils/index';
import { FluxContext } from './utils/wrappers';


const ENV = process.env.NODE_ENV || 'production';

const app = express();

app.set('views', 'src/views');
app.set('view engine', 'jade');

app.use(express.static('build'));

// Mock API endpoints!
// TODO(dbow): Remove from anything real.
import mockApi from './mock-api';
app.use('/api', mockApi);

app.get('/*', function (req, res) {
  const location = req.url;
  match({ routes, location }, (error, redirect, renderProps) => {
    if (error) {
      res.status(500).send(error.message);

    } else if (redirect) {
      res.redirect(302, redirect.pathname + redirect.search);

    } else if (renderProps) {
      const store = new IndexStore();
      const dependencies = getDependencies(renderProps.routes,
                                           store,
                                           renderProps.params);
      Promise.all(dependencies)
        .then(() => {
          const content = renderToString((
            <FluxContext store={store}>
              <RouterContext {...renderProps} />
            </FluxContext>
          ));
          const data = store.serialize();
          res.render('index', {
            content,
            data,
            development: ENV === 'development',
          });
        })
        .catch((error) => {
          console.log(error);
          res.status(404).send('Not found');
        });
    } else {
      console.log(error);
      res.status(404).send('Not found');
    }
  });
});

const server = app.listen(3000, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
});

