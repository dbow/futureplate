import _ from 'lodash';


/**
 * Calls all the dependency action methods defined on a set of routes, and
 * returns the promises for the actions.
 *
 * @param {Array<Route>} routes to get dependencies for.
 * @param {Store} store instance to pass to the route actions.
 * @param {Object} params to be passed to the actions.
 *
 * @return {Array<Promise>} array of promises returned by each action defined
 *     in the routes.
 */
export function getDependencies(routes, store, params) {
  if (!_.isArray(routes)) {
    throw new Error('getDependencies: Must provide array of routes!');
  }

  const promises = _.reduce(routes, (result, route) => {
    let dependencies = route.dependencies;
    if (dependencies) {
      // "dependencies=" can be a single action or an array of actions.
      if (!_.isArray(dependencies)) {
        dependencies = [route.dependencies];
      }
      // Call the actions with the given store and params, and add the
      // returned promises to the result.
      result = result.concat(_.map(dependencies, (action) => {
        return action(store, params);
      }));
    }
    return result;
  }, []);

  return promises;
}

