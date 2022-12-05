<template>
  <div id="app">
    <div v-if="$store.state.auth">
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
                  v-if="$store.state.auth"
                  class="btn btn-primary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {{ $store.state.user.nombre_completo }}
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" @click="logout">{{
                      $store.state.lang.prefijo == "es"
                        ? "Cerrar Sesión"
                        : "Logout"
                    }}</a>
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
            Check List
            {{ $store.state.lang.prefijo == "es" ? " Sistemas" : " Systems" }}
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
                <small v-if="$store.state.auth">{{
                  $store.state.user.hotel.siglas
                }}</small>
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
                <small class="text-muted">{{ $store.state.hoy }}</small>
              </div>
            </router-link>
            <router-link
              to="/edit"
              class="list-group-item list-group-item-action"
            >
              <div
                class="d-flex w-100 justify-content-between"
                data-bs-dismiss="offcanvas"
              >
                <h5 class="mb-1">
                  {{
                    $store.state.lang.prefijo == "es"
                      ? "Editar Check List"
                      : "Edit Check List"
                  }}
                </h5>
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
        <h1 class="text-primary">
          {{
            $store.state.lang.prefijo == "es"
              ? "Sistemas Check List"
              : "Check List Systems"
          }}
        </h1>
      </div>
      <div class="card text-center">
        <div class="card-header bg-primary text-light">
          <h1>
            {{ $store.state.lang.prefijo == "es" ? "Iniciar Sesión" : "Login" }}
          </h1>
        </div>
        <div class="card-body">
          <h5 class="text-danger">{{ $store.state.titulo }}</h5>
          <div class="text-start">
            <strong class="text-danger text-start">{{
              $store.state.inputs
            }}</strong>
          </div>
          <form @submit.prevent="login">
            <div class="mb-3 text-start">
              <label class="form-label">{{
                $store.state.lang.prefijo == "es" ? "Usuario" : "User"
              }}</label>
              <div class="form-floating">
                <input
                  v-model="username"
                  type="text"
                  class="form-control"
                  id="username"
                  placeholder="username"
                  autocomplete="off"
                />
                <label class="text-muted" for="username"
                  ><small>{{
                    $store.state.lang.prefijo == "es"
                      ? "Escribir Usuario"
                      : "Write User"
                  }}</small></label
                >
              </div>
            </div>
            <div class="mb-3 text-start">
              <label class="form-label">{{
                $store.state.lang.prefijo == "es" ? "Contraseña" : "Password"
              }}</label>
              <div class="form-floating">
                <input
                  v-model="password"
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="password"
                  autocomplete="off"
                />
                <label class="text-muted" for="password"
                  ><small>{{
                    $store.state.lang.prefijo == "es"
                      ? "Escribir Contraseña"
                      : "Write Password"
                  }}</small></label
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
export default {
  data: () => ({
    username: "",
    password: "",
  }),
  methods: {
    login() {
      this.$store.dispatch("login", {
        username: this.username,
        password: this.password,
      });
    },
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>
