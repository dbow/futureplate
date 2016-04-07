import css from './things.css';

import React from 'react';
import {provideHooks} from 'redial';

import {getIds} from 'src/actions/index';


const dependencies = provideHooks({
  fetch: ({store, params}) => getIds(store, params),
});

function Things(props) {
  return (
    <div className={css.div}>
      {props.children}
    </div>
  );
}

export default dependencies(Things);

