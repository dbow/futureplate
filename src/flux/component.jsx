/* @flow */

import React from 'react';

import typeof Store from 'stores/index';


export default function(Component: Object): Function {
  const FluxComponent = (props, context) => {
    const { store } = context;
    const fluxProps: { store: Store; ref?: Function } = {
      store,
    };
    if (props.fluxRef) {
      fluxProps.ref = props.fluxRef;
    }
    return <Component {...props} {...fluxProps} />;
  }
  FluxComponent.contextTypes = {
    store: React.PropTypes.object,
  };
  return FluxComponent;
};

