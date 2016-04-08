import * as api from 'src/utils/api';


export function getIds(store) {
  const cacheKey = 'ids';
  const cacheTtl = 10 * 1000;
  if (!store.cache.expired(cacheKey, cacheTtl)) {
    return Promise.resolve();
  }

  const promise = api.get('things').then((response) => {
    store.stores.ids.setState(response.ids);
    store.cache.set(cacheKey);
  });

  return promise;
}

export function getThing(store, params) {
  const {id = null} = params;

  const cacheKey = 'things' + id;
  const cacheTtl = 30 * 1000;
  if (!store.cache.expired(cacheKey, cacheTtl)) {
    return Promise.resolve();
  }

  const promise = api.get(`things/${id}`).then((response) => {
    store.stores.things.setState({ [id]: response });
    store.cache.set(cacheKey);
  });

  return promise;
}

export function getNumber(store) {
  const cacheKey = 'number';
  const cacheTtl = 30 * 1000;
  if (!store.cache.expired(cacheKey, cacheTtl)) {
    return Promise.resolve();
  }

  const promise = api.get('number').then((response) => {
    store.stores.number.setState(response);
    store.cache.set(cacheKey);
  });

  return promise;
}

export function setNumber(store, number) {
  const cacheKey = 'number';
  if (store.request.inProgress(cacheKey)) {
    return;
  }
  store.request.start(cacheKey);

  const promise = api.put('number', {number}).then((response) => {
    store.request.finish(cacheKey);
    store.stores.number.setState(response);
    store.cache.set(cacheKey);
  });

  return promise;
}


