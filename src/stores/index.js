import _ from 'lodash';
import EventEmitter from 'events';
import update from 'react-addons-update';

import IdStore from './ids';
import ThingStore from './things';
import RandomStore from './random';

import Cache from './cache';


class IndexStore extends EventEmitter {
  constructor() {
    super();

    this.stores = {
      ids: new IdStore(),
      things: new ThingStore(),
      random: new RandomStore(),
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


export default IndexStore;

