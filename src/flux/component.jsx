import React from 'react';


export default function (Component) {
  const FluxComponent = (props, context) => {
    const {store, router} = context;
    const fluxProps = {
      store,
      router,
    };
    if (props.fluxRef) {
      fluxProps.ref = props.fluxRef;
    }
    return <Component {...props} {...fluxProps} />;
  }
  FluxComponent.contextTypes = {
    store: React.PropTypes.object,
    router: React.PropTypes.object,
  };
  return FluxComponent;
};

