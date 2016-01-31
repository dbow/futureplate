import express from 'express';
import _ from 'lodash';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import favicon from 'serve-favicon';
import serialize from 'serialize-javascript';

import routes from './routes';

import IndexStore from './stores/index';
import { getDependencies } from './utils/index';
import { FluxContext } from './utils/wrappers';


const DEVELOPMENT = process.env.NODE_ENV === 'development';
const HOT_MODULE_REPLACEMENT = DEVELOPMENT && process.env.HMR;

const app = express();

const PORT = process.env.PORT || 3000;
app.set('port', PORT);

app.set('views', 'src/views');
app.set('view engine', 'jade');

app.use(favicon(__dirname + '/images/favicon.ico'));
app.use('/images', express.static(__dirname + '/images'));

// Mock API endpoints!
// TODO(dbow): Remove when API exists!
import mockApi from './mock-api';
app.use('/api', mockApi);

process.env.API_URL = process.env.API_URL || `http://127.0.0.1:${PORT}/api/`;

// Serve up /build directory statically when not doing hot module replacement.
if (!HOT_MODULE_REPLACEMENT) {
  app.use('/static', express.static('build/client'));
}


app.get('/*', function(req, res) {
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
          const data = serialize(store.serialize());
          res.render('index', {
            content,
            data,
            development: DEVELOPMENT,
            base: HOT_MODULE_REPLACEMENT ? 'http://localhost:8080' : '',
          });
        })
        .catch((error) => {
          console.log(error);
          res.status(404).send('Not found');
        });
    } else {
      console.log(location);
      res.status(404).send('Not found');
    }
  });
});

const server = app.listen(app.get('port'), function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
});

