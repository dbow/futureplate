import _ from 'lodash';
import Store from './base';

export default class IdStore extends Store {
  constructor() {
    super('ids');
  }

  getOddThings() {
    return this.state.filter(id => id % 2);
  }
}

