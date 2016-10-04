class PubSub {

  constructor() {

    this.events = [];
    this.eventTypes = {
      blur: 'blur-field',
      change: 'change-field',
      validatorRemoved: 'validator-removed',
      validatorCreated: 'validator-created'
    };
  }

  subscribe(event, handler) {
    if(!event || !handler) {
      return;
    }

    if(!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(handler);
  }

  publish(event, ...data) {
    if(!this.events[event]) {
      return;
    }
    this.events[event].forEach(handler => {
      handler(...data);
    });
  }
}

export default new PubSub();
