import React from 'react';


// Note: This module is used to create higher order components as an
// alternative to using mixins, based on the pattern here:
//     https://medium.com/@dan_abramov/
//         mixins-are-dead-long-live-higher-order-components-94a0d2f9e750


/**
 * Re-render the given Component whenever the store updates and add the
 * store to the Component's context (e.g. `this.context.store`).
 *
 * This should be called on any container components in charge of getting
 * data from the store and passing it to presentational components. The
 * action dependencies of the particular container component should be passed
 * in as the second argument. And the resulting component should be rendered
 * by a route.
 *
 * @param {Component} Component to re-render on store updates.
 * @param {Function|Array.<Function>} dependencies an action that returns a
 *     promise, or an array of such actions. Expresses the action dependencies
 *     that will populate the store with the data needed by the component.
 *
 * @return {Component} Higher order component that will re-render on store
 *     updates.
 */
export function subscribeToStore(Component, dependencies) {
  // Add store to component's context (via `this.context.store`).
  Component.contextTypes = {
    store: React.PropTypes.object,

    // Preserve react-router on component context.
    router: React.PropTypes.object,
  };

  const container = React.createClass({
    contextTypes: {
      store: React.PropTypes.object,
    },

    componentDidMount() {
      this.context.store.on('update', this.rerender);
    },

    componentWillUnmount() {
      this.context.store.removeListener('update', this.rerender);
    },

    rerender() {
      this.forceUpdate();
    },

    render() {
      return <Component {...this.props} {...this.state} />;
    }
  });

  container.dependencies = dependencies;

  return container;
};


/**
 * Top-level component that provides flux objects via context to all children.
 *
 * Should be used as a wrapper around any routing to provide the flux objects
 * to the React subtree.
 *
 * Based on Redux's Provider component:
 * https://github.com/rackt/react-redux/blob/master/src/components/Provider.js
 *
 * NOTE: Only supplies the store in this implementation but could be updated
 * to provide other flux-related objects if necessary.
 */
export class FluxContext extends React.Component {
  getChildContext() {
    return { store: this.store };
  }

  constructor(props, context) {
    super(props, context);
    this.store = props.store;
  }

  render() {
    return this.props.children;
  }
}
FluxContext.childContextTypes = {
  store: React.PropTypes.object,
}

