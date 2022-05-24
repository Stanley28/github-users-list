import Octokat from "octokat";

export default class DataFetcherHandler {
  constructor(store) {
    this._store = store;
    this._init();
  }

  _init() {
    if (this._store.state?.auth?.token) {
      this._instance = new Octokat({
        token: this._store.state.auth.token,
      });
    }
  }

  getInstance() {
    if (!this._instance) {
      this._init();
    }

    return this._instance;
  }
}
