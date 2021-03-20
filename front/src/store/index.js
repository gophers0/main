import Vue from "vue";
import Vuex from "vuex";
import { authService } from "@/api/auth";

Vue.use(Vuex);

export default new Vuex.Store({
  state: () => ({
    user: null,
  }),
  getters: {
    user: (state) => state.user,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    /**
     * @return {Promise<void>}
     */
    async fetchUser({ commit }, token) {
      const user = await authService.me(token);
      commit("setUser", user);
    },
    async login({ dispatch }, data) {
      const token = await authService.login(data);
      await dispatch("fetchUser", token);
    },
  },
  modules: {},
});
