import _ from 'lodash';
import EventEmitter from 'events';
import sculpt from 'sculpt';

import IdStore from './ids';
import ThingStore from './things';

import Cache from './cache';


class IndexStore extends EventEmitter {
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
        state = sculpt(state, {$assign: storeState});
      }
      return state;
    }, {});

    data = sculpt(data, {
      _cache: {
        $set: this.cache.serialize(),
      },
    });

    return data;
  }
}


export default IndexStore;

