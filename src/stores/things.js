import Store from 'stores/base';

export default class ThingStore extends Store {
  constructor() {
    super();
    this.state = {
      ids: [],
      thingsById: {},
    };
  }
}

