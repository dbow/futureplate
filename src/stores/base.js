import _ from 'lodash';
import EventEmitter from 'events';
import update from 'react-addons-update';


export default class Store extends EventEmitter {
  constructor() {
    super();
    this.state = {
      ids: [],
      thingsById: {},
    };
  }

  getState() {
    return _.cloneDeep(this.state);
  }

  initialize(data) {
    this.state = update(this.state, {$merge: data});
  }

  serialize() {
    return this.getState();
  }

  setState(data) {
    this.state = update(this.state, {$merge: data});
    this.emit('update');
  }
}

