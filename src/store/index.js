import Vuex from "vuex";
import Vue from "vue";

import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://127.0.0.1/";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    auth: false,
    titulo: "",
    inputs: "",
  },
  getters: {},
  mutations: {
    SET_USER(state, user) {
      state.user = user;
      state.auth = Boolean(user);
    },
    SET_ERRORS(state, errors) {
      state.titulo = errors.titulo;
      state.inputs = errors.message;
    },
  },
  actions: {
    login(credentials) {
      console.log(credentials);
      axios.post("api/loginapp", credentials).then((res) => {
        if (res.data.error == true) {
          this.commit("SET_ERRORS", res.data);
          this.commit("SET_USER", null);
        }
        if (res.data.existe == false) {
          this.commit("SET_ERRORS", res.data);
          this.commit("SET_USER", null);
        }
        if (res.data.correct == false) {
          this.commit("SET_ERRORS", res.data);
          this.commit("SET_USER", null);
        }
        if (res.data.login == true) {
          this.commit("SET_USER", res.data.user);
        }
      });
    },
  },
  modules: {},
});
