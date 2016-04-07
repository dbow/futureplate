export default class Cache {
  constructor() {
    this.cache = {};
  }

  initialize(data) {
    this.cache = data;
  }

  set(key) {
    this.cache[key] = new Date().getTime();
  }

  expired(key, ttl) {
    const cached = this.cache[key];
    if (!cached) {
      return true;
    }

    const now = new Date().getTime();
    if (now - cached > ttl) {
      delete this.cache[key];
      return true;
    }

    return false;
  }

  serialize() {
    return this.cache;
  }
}

