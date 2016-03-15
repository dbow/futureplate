import _ from 'lodash';
import deepFreeze from 'deep-freeze';
import EventEmitter from 'events';
import sculpt from 'sculpt';


export default class Store extends EventEmitter {
  constructor(key) {
    super();
    this.key = key;
    this.state = null;
    this._selections = new WeakMap();
  }

  initialize(data) {
    const state = data[this.key];
    this.state = state ? deepFreeze(state) : state;
    this._selections = new WeakMap();
  }

  getState() {
    return this.state;
  }

  setState(data) {
    // TODO (kyle): i'm not sure $merg'ing here is expected behavior
    this.state = this.state ? sculpt(this.state, {$assign: data}) : deepFreeze(data);
    this._selections = new WeakMap();
    this.emit('update');
  }

  updateState(spec) {
    this.state = sculpt(this.state, spec);
    this._selections = new WeakMap();
    this.emit('update');
  }

  serialize() {
    return {
      [this.key]: this.getState(),
    };
  }

  createSelector(method) {
    return function () {
      const result = this._selections[method];
      if (result) {
        return result;
      }
      return this._selections[method] = method.apply(this, arguments);
    }
  }
}

