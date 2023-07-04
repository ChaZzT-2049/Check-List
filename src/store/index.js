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
    api_key: "**************",
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
          window.$("#titulo").empty();
          window.$("#mensaje").empty();

          window.$("#toast").toggleClass("show");
          window
            .$("#titulo")
            .append("Bienvenido, " + res.data.user.nombre_completo);
          window.$("#mensaje").append("Sesion Iniciada Con Exito");

          setTimeout(function () {
            window.$("#toast").toggleClass("show");
          }, 1500);

          this.commit("SET_USER", res.data.user);
          this.commit("SET_LANG", res.data.lang);
          this.commit("SET_DATE", res.data.hoy);
        }
      });
    },
    logout() {
      axios.post("logoutapp").then((res) => {
        this.commit("SET_USER", null);

        window.$("#titulo").empty();
        window.$("#mensaje").empty();

        window.$("#toast").toggleClass("show");
        window.$("#titulo").append("Hasta Luego");
        window.$("#mensaje").append(res.data.message);

        setTimeout(function () {
          window.$("#toast").toggleClass("show");
        }, 1500);
      });
    },
  },
  modules: {},
});
