<template>
  <div id="app">
    <div v-if="user.username != null">
      <!--Navbar-->
      <nav class="sticky-top navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container-fluid">
          <button
            style="margin-right: 5px"
            class="btn btn-light bg-primary"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasWithBothOptions"
            aria-controls="offcanvasWithBothOptions"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <router-link to="/" class="navbar-brand">
            <img
              src="https://res.cloudinary.com/itermotus/q_auto,h_45,dpr_2.0/assets/oceanhotels/logo.svg"
              alt="Ocean by H10"
              width="100"
              height="40"
              class="bg-light d-inline-block align-text-center"
            />
            Check List
          </router-link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item"></li>
            </ul>
            <div class="d-flex" style="padding-right: 50px">
              <div class="dropdown">
                <button
                  class="btn btn-primary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {{ user.username }}
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Perfil</a></li>
                  <li><hr class="dropdown-divider" /></li>
                  <li>
                    <a class="dropdown-item" @click="logout">Cerrar Sesion</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <!--Sidebar-->
      <div
        style="max-width: 270px"
        class="offcanvas offcanvas-start"
        data-bs-scroll="true"
        tabindex="-1"
        id="offcanvasWithBothOptions"
        aria-labelledby="offcanvasWithBothOptionsLabel"
      >
        <div class="offcanvas-header text-bg-primary p-3">
          <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">
            Check List Sistemas
          </h5>
          <button
            type="button"
            class="btn-close bg-light"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <hr />
          <div class="list-group">
            <router-link
              to="/"
              class="list-group-item list-group-item-action"
              aria-current="true"
            >
              <div
                class="d-flex w-100 justify-content-between"
                data-bs-dismiss="offcanvas"
              >
                <h5 class="mb-1">Home</h5>
                <small>ORP</small>
              </div>
            </router-link>
            <router-link
              to="/checklist"
              class="list-group-item list-group-item-action"
            >
              <div
                class="d-flex w-100 justify-content-between"
                data-bs-dismiss="offcanvas"
              >
                <h5 class="mb-1">Check List</h5>
                <small class="text-muted">2022-11-16</small>
              </div>
            </router-link>
            <router-link
              to="/login"
              class="list-group-item list-group-item-action"
            >
              <div
                class="d-flex w-100 justify-content-between"
                data-bs-dismiss="offcanvas"
              >
                <h5 class="mb-1">Estadisticas</h5>
              </div>
            </router-link>
          </div>
          <hr />
        </div>
      </div>
      <router-view />
    </div>
    <div
      v-else
      style="padding: 20px; margin-bottom: 80px; max-width: 500px"
      class="container-fluid mh-100"
    >
      <div class="text-center" style="padding: 30px">
        <img
          class="bg-light img-fluid"
          src="https://res.cloudinary.com/itermotus/q_auto,h_45,dpr_2.0/assets/oceanhotels/logo.svg"
          alt="Ocean by H10"
        />
        <h1 class="text-primary">Sistemas Check List</h1>
      </div>
      <div class="card text-center">
        <div class="card-header bg-primary text-light">
          <h1>Iniciar Sesion</h1>
        </div>
        <div class="card-body">
          <form @submit.prevent="login">
            <div class="mb-3 text-start">
              <label class="form-label">Correo</label>
              <div class="form-floating">
                <input
                  v-model="form.username"
                  type="text"
                  class="form-control"
                  id="username"
                  placeholder="username"
                  autocomplete="off"
                />
                <label class="text-muted" for="username"
                  ><small>Escribir Email</small></label
                >
              </div>
            </div>
            <div class="mb-3 text-start">
              <label class="form-label">Contraseña</label>
              <div class="form-floating">
                <input
                  v-model="form.password"
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="password"
                  autocomplete="off"
                />
                <label class="text-muted" for="password"
                  ><small>Escribir Contraseña</small></label
                >
              </div>
            </div>
            <button class="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://127.0.0.1/";
export default {
  data: () => ({
    user: {},
    form: {
      username: "sroot",
      password: "12345678",
    },
  }),
  methods: {
    login() {
      axios.post("api/loginapp", this.form).then((res) => {
        if (res.data.error == true) {
          console.log(res.data.message);
          console.log(res.data.msj);
        } else {
          //console.log(res.data.user);
          console.log(res.data.message);
          this.user = res.data.user;
        }
      });
    },
    logout() {
      axios.post("api/logoutapp").then((res) => {
        console.log(res.data.message);
        this.user = res.data.user;
      });
    },
  },
};
</script>
