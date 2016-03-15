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
    const state = data[this.key];
    this.state = state ? deepFreeze(state) : state;
  }

  getState() {
    return this.state;
  }

  setState(data) {
    this.state = this.state ? sculpt(this.state, {$assign: data}) : deepFreeze(data);
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

