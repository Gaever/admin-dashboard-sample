export default class ObserverFactory {
  registry = new Map();

  on(event, cb) {
    this.registry.set(event, cb);
  }

  produceMiddleware() {
    return store => dispatch => (action) => {
      const { type } = action || {};
      const handler = this.registry.get(type);

      if (handler && typeof handler === 'function') {
        handler({ store, dispatch, action });
      }

      dispatch(action);
    };
  }

  produceReducer(initialState) {
    return (state = initialState, action) => {
      const { type } = action || {};
      const handler = this.registry.get(type);

      if (handler && typeof handler === 'function') {
        return handler({ state, action });
      }

      return state;
    };
  }
}
