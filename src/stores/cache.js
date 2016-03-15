import _ from 'lodash';
import {set} from 'sculpt';


export default class Cache {
  constructor() {
    this.cache = {};
  }

  initialize(data) {
    this.cache = data;
  }

  set(key) {
    this.cache = set(this.cache, key, new Date().getTime());
  }

  expired(key, ttl) {
    if (this.__perma) {
      return false;
    }

    const cached = this.cache[key];
    if (!cached) {
      return true;
    }

    const now = new Date().getTime();
    if (now - cached > ttl) {
      this.cache = _.omit(this.cache, key);
      return true;
    }

    return false;
  }

  serialize() {
    return this.cache;
  }

  setPerma(perma) {
    this.__perma = perma;
  }
}

