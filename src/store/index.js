import Vuex from "vuex";
import Vue from "vue";

import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://127.0.0.1/api/";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    lang: { prefijo: "es" },
    hoy: "",
    auth: false,
    titulo: "",
    inputs: "",
    api_key: "key_cur_prod_Cr9NqVEqoQKhxDVtwEPT4xsUExgEV4vae",
  },
  getters: {},
  mutations: {
    SET_USER(state, user) {
      state.user = user;
      state.auth = Boolean(user);
    },
    SET_LANG(state, lang) {
      state.lang = lang;
    },
    SET_DATE(state, hoy) {
      state.hoy = hoy;
    },
    SET_ERRORS(state, errors) {
      state.titulo = errors.titulo;
      state.inputs = errors.message;
    },
  },
  actions: {
    login(username, password) {
      axios.post("loginapp", password).then((res) => {
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
          this.commit("SET_LANG", res.data.lang);
          this.commit("SET_DATE", res.data.hoy);
        }
      });
    },
    logout() {
      axios.post("logoutapp").then((res) => {
        console.log(res.data.message);
        this.commit("SET_USER", null);
      });
    },
  },
  modules: {},
});
