import _ from 'lodash';
import EventEmitter from 'events';
import update from 'react-addons-update';


export default class Store extends EventEmitter {
  constructor(key) {
    super();
    this.key = key;
    this.state = null;
  }

  initialize(data) {
    this.state = data[this.key];
  }

  getState() {
    return _.cloneDeep(this.state);
  }

  setState(data) {
    this.state = this.state ? update(this.state, {$merge: data}) : data;
    this.emit('update');
  }

  serialize() {
    return {
      [this.key]: this.getState(),
    };
  }
}

