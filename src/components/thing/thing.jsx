import css from './thing.css';

import React from 'react';
import {provideHooks} from 'redial';

import {getThing} from 'src/actions/index';
import FluxComponent from 'src/flux/component.jsx';


const dependencies = provideHooks({
  fetch: ({store, params}) => getThing(store, params),
});

function Thing(props) {
  const {store, params} = props;
  const id = parseInt(params.id, 10);
  const things = store.stores.things.getState();
  const thing = things && things[id] || {};
  return (
    <div className={css.default}>
      Thing { thing.id } : { thing.text }
    </div>
  );
}

export default dependencies(FluxComponent(Thing));

