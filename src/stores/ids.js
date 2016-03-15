import _ from 'lodash';
import Store from './base';

export default class IdStore extends Store {
  constructor() {
    super('ids');

    this.getOddThings = this.createSelector(this.getOddThings);
  }

  getOddThings() {
    return this.state.filter(id => id % 2);
  }
}

