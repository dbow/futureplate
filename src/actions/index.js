import * as api from 'utils/api';


export function getIds(store) {
  const promise = api.get('things').then((response) => {
    store.setState(response);
  });
  return promise;
}

export function getThing(store, params) {
  const { id = null } = params;
  const promise = api.get(`things/${id}`).then((response) => {
    let thingsById = store.getState().thingsById || {};
    thingsById[id] = response;
    store.setState({thingsById});
  });
  return promise;
}

