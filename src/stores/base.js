import _ from 'lodash';
import deepFreeze from 'deep-freeze';
import EventEmitter from 'events';
import sculpt from 'sculpt';


export default class Store extends EventEmitter {
  constructor(key) {
    super();
    this.key = key;
    this.state = null;
  }

  initialize(data) {
    this.state = deepFreeze(data[this.key]);
  }

  getState() {
    return this.state;
  }

  setState(data) {
    this.state = this.state ? sculpt(this.state, {$merge: data}) : deepFreeze(data);
    this.emit('update');
  }

  updateState(spec) {
    this.state = sculpt(this.state, spec);
    this.emit('update');
  }

  serialize() {
    return {
      [this.key]: this.getState(),
    };
  }
}

