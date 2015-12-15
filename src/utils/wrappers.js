import React from 'react';

import store from 'stores/index';


/**
 * Note: The functions in this module are used to create higher order
 *     components as an alternative to using mixins, based on the pattern here:
 *     https://medium.com/@dan_abramov/
 *         mixins-are-dead-long-live-higher-order-components-94a0d2f9e750
 */


export function subscribeToStore(Component) {
  return React.createClass({
    componentDidMount() {
      store().on('update', this.rerender);
    },

    componentWillUnmount() {
      store().removeListener('update', this.rerender);
    },

    rerender() {
      this.forceUpdate();
    },

    render() {
      return <Component {...this.props} {...this.state} />;
    }
  });
};

