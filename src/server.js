import express from 'express';
import _ from 'lodash';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';

import routes from 'routes';
import Store from 'stores/base';
import { setStore } from 'stores/index';
import { setBaseUrl } from 'utils/api';
import { getDependencies } from 'utils/index';


const app = express();

app.set('views', 'src/views');
app.set('view engine', 'jade');

app.use(express.static('build'));

// Mock API endpoints!
// TODO(dbow): Remove from anything real.
import mockApi from 'mock-api';
app.use('/api', mockApi);

setBaseUrl('http://localhost:3000/api/');

app.get('/*', function (req, res) {
  const location = req.url;
  match({ routes, location }, (error, redirect, renderProps) => {
    if (error) {
      res.status(500).send(error.message);

    } else if (redirect) {
      res.redirect(302, redirect.pathname + redirect.search);

    } else if (renderProps) {
      const store = new Store();
      const dependencies = getDependencies(renderProps.routes,
                                           store,
                                           renderProps.params);
      Promise.all(dependencies)
        .then(() => {
          setStore(store);
          const content = renderToString(<RouterContext {...renderProps} />);
          const data = store.serialize();
          res.render('index', { content, data });
        })
        .catch((error) => {
          res.status(404).send('Not found');
        });
    } else {
      res.status(404).send('Not found');
    }
  });
});

const server = app.listen(3000, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
});

