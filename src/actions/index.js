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
  const { id = null } = params;

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

export function getRandomNumber(store) {
  const cacheKey = 'random';
  const cacheTtl = 30 * 1000;
  if (!store.cache.expired(cacheKey, cacheTtl)) {
    return Promise.resolve();
  }

  const promise = api.get('random').then((response) => {
    store.stores.random.setState(response);
    store.cache.set(cacheKey);
  });

  return promise;
}

