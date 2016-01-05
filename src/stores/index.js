import ThingStore from 'stores/things';


let store = new ThingStore();

function get() {
  return store;
}

export function setStore(newStore) {
  store = newStore;
}

export default get;

