export default class Request {
  constructor() {
    this.requests = {};
  }

  start(key) {
    this.requests[key] = true;
  }

  finish(key) {
    this.requests[key] = false;
  }

  inProgress(key) {
    return this.requests[key];
  }
}

