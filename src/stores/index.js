import _ from 'lodash';
import EventEmitter from 'events';
import update from 'react-addons-update';

import IdStore from 'stores/ids';
import ThingStore from 'stores/things';

import Cache from 'stores/cache';


export class IndexStore extends EventEmitter {
  constructor() {
    super();

    this.stores = {
      ids: new IdStore(),
      things: new ThingStore(),
    };

    this.cache = new Cache();
  }

  initialize(data) {
    _.forEach(this.stores, (store) => {
      store.initialize(data);
      store.on('update', () => {
        this.emit('update');
      });
    });

    this.cache.initialize(data._cache);
  }

  serialize() {
    let data = _.reduce(this.stores, (state, store) => {
      const storeState = store.serialize();
      if (storeState) {
        state = update(state, {$merge: storeState});
      }
      return state;
    }, {});

    data._cache = this.cache.serialize();

    return data;
  }
}

let store = new IndexStore();

function get() {
  return store;
}

export function setStore(newStore) {
  store = newStore;
}

export default get;

