import React from 'react';


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
export default class FluxRoot extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = props.store;
  }

  getChildContext() {
    return {
      store: this.store,
    };
  }

  componentDidMount() {
    this.listener = () => this.forceUpdate();
    this.store.on('update', this.listener);
  }

  componentWillUnmount() {
    this.store.removeListener('update', this.listener);
  }

  render() {
    return this.props.children;
  }
}

FluxRoot.childContextTypes = {
  store: React.PropTypes.object,
};

