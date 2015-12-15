import Store from 'stores/base';


let store = new Store();

function get() {
  return store;
}

export function setStore(newStore) {
  store = newStore;
}

export default get;

