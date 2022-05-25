import config from "@/config";

const token = localStorage.getItem('token');

const state = {
  token: token ? token : null,
};

const getters = {
  token(state) {
    return state.token;
  },

  isAuth(state) {
    return !!state.token;
  },
};

const mutations = {
  setToken(state, payload) {
    state.token = payload;
  },
};

const actions = {
  async login({ commit }, payload) {
    const response = await fetch(
      `/login/oauth/access_token?client_id=${config.client_id}&client_secret=${config.client_secret}&code=${payload.code}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
      }
    );

    const json = await response.json();
    const { access_token } = json;

    commit("setToken", access_token);
    localStorage.setItem('token', access_token);

    return json;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
