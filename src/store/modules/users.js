const state = {
  users: [],
  findedUsers: [],
  allLoaded: false,
};

const getters = {
  users(state) {
    return state.users;
  },

  findedUsers(state) {
    return state.findedUsers;
  },

  allLoaded(state) {
    return state.allLoaded;
  },
};

const mutations = {
  addUsers(state, payload) {
    state.users = [...state.users, ...payload];
  },

  setUsers(state, payload) {
    state.users = payload;
  },

  addFindedUsers(state, payload) {
    state.findedUsers = [...state.findedUsers, ...payload];
  },

  setFindedUsers(state, payload) {
    state.findedUsers = payload;
  },

  setAllLoaded(state, payload) {
    state.allLoaded = payload;
  },
};

const actions = {
  async fetchUsers(store, payload) {
    const octo = this.dataFetcherHandler.getInstance();

    try {
      const users = await octo.users.fetch({ since: payload.id });

      store.commit("addUsers", users.items);

      if (0 === users.items.length) {
        store.commit("setAllLoaded", true);
      }

      return users;
    } catch (e) {
      return [];
    }
  },

  async fetchUser(store, payload) {
    const octo = this.dataFetcherHandler.getInstance();

    try {
      const user = await octo.users(payload.login).fetch();

      return user;
    } catch (e) {
      return null;
    }
  },

  async searchUsers(store, payload) {
    const octo = this.dataFetcherHandler.getInstance();

    try {
      const result = await octo.search.users.fetch({
        q: payload.query,
        page: payload.page,
      });

      if (payload.needReset) {
        store.commit("setFindedUsers", result.items);
      } else {
        store.commit("addFindedUsers", result.items);
      }

      store.getters.findedUsers.length === result.totalCount
        ? store.commit("setAllLoaded", true)
        : store.commit("setAllLoaded", false);

      return result;
    } catch (e) {
      return [];
    }
  },

  async fetchReposByUser(store, payload) {
    const octo = this.dataFetcherHandler.getInstance();

    try {
      return await octo.users(payload.login).repos.fetch({
        sort: payload.sort,
        direction: payload.direction,
        page: payload.page,
      });
    } catch (e) {
      return [];
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
