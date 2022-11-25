<template>
  <div
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
</template>
<script>
import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://127.0.0.1/";
export default {
  data: () => ({
    user: {},
    form: {
      username: "",
      password: "",
    },
  }),
  methods: {
    login() {
      axios.post("api/loginapp", this.form).then((res) => {
        if (res.data.error == true) {
          console.log(res.data.message);
          console.log(res.data.msj);
        } else {
          console.log(res.data.user);
          console.log(res.data.message);
          this.user = res.data.user;
          this.$router.push("/dashboard");
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
