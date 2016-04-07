import css from './list.css';

import React from 'react';
import {Link} from 'react-router';

import FluxComponent from 'src/flux/component.jsx';


function List(props) {
  const {store} = props;
  const things = store.stores.ids.getState() || [];
  return (
    <div>
      { things.map(thing => (
        <li key={thing}>
          <Link className={css.link} to={`list/thing/${thing}`}>
            {thing}
          </Link>
        </li>
      )) }
      List
    </div>
  );
}

export default FluxComponent(List);

