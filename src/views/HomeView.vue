<template>
  <div
    style="padding: 10px; margin-bottom: 80px; max-width: 900px"
    class="container-fluid mh-100"
  >
    <div class="card text-center">
      <div class="card-header">
        <h1>Home</h1>
      </div>
      <div class="card-body">
        <div
          class="card text-center"
          style="margin-top: 10px; margin-bottom: 10px"
        >
          <div class="card header bg-primary text-light">
            <h2>Hotel</h2>
          </div>
          <div class="card-body">
            <img
              class="card-img-top"
              style="max-width: 400px"
              :src="'http://localhost/image/ocean.png'"
              alt="Ocean by H10"
            />
            <hr />
            <h3 class="card-title">{{ $store.state.user.hotel.nombre }}</h3>
            <p class="card-text">
              {{ $store.state.user.hotel.siglas }} <br />{{
                $store.state.user.hotel.direccion
              }}
            </p>
          </div>
        </div>
        <div class="card text-start">
          <h4 class="card-header bg-primary text-light">
            {{
              $store.state.lang.prefijo == "es"
                ? $store.state.user.hotel.siglas + " Resumen de Hoy "
                : $store.state.user.hotel.siglas + " Today Sumary"
            }}
          </h4>
          <div
            class="card-body"
            style="padding-left: 12px; padding-top: 0px; padding-bottom: 0px"
          >
            <div class="row">
              <div
                class="col-6 text-center border-end border-2"
                style="
                  padding-top: 12px;
                  padding-bottom: 12;
                  padding-right: 5px;
                  padding-left: 5px;
                "
              >
                <img
                  :src="'http://localhost/image/Checklist.png'"
                  class="img-fluid rounded-center"
                  alt="Checklist"
                />
              </div>
              <div class="col-6">
                <p class="card-text">
                  <b>Check Lists: </b>{{ checklist }}<br /><b>{{
                    $store.state.lang.prefijo == "es"
                      ? "Act Realizadas: "
                      : "Act Performed: "
                  }}</b
                  >{{ hotelchequeos }}<br />
                </p>
                <p class="card-text">
                  OK: <b class="text-success">{{ ok }}</b
                  ><br />
                  {{
                    $store.state.lang.prefijo == "es"
                      ? "Fallando: "
                      : "Failing: "
                  }}<b class="text-danger">{{ fallando }}</b
                  ><br />
                  {{
                    $store.state.lang.prefijo == "es"
                      ? "No Completado: "
                      : "Not Completed: "
                  }}<b class="text-primary">{{ nocompletado }}</b>
                </p>
                <p class="card-text">
                  <b>
                    {{
                      $store.state.lang.prefijo == "es"
                        ? "Actualizado: "
                        : "Updated at: "
                    }}</b
                  ><br />
                  <small v-if="ultimo" class="text-muted">{{
                    ultimo.created_at
                  }}</small>
                </p>
              </div>
            </div>
          </div>
          <div class="card-footer text-center">
            <div class="row">
              <div class="col-6"></div>
              <div class="col-6">
                <router-link
                  to="/checklist"
                  type="button"
                  class="btn btn-primary"
                >
                  {{
                    $store.state.lang.prefijo == "es"
                      ? "Ver Check List"
                      : "See Check List"
                  }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div
          class="card text-center"
          style="margin-top: 10px; margin-bottom: 10px"
        >
          <div class="card header bg-primary text-light">
            <h4>
              {{ $store.state.lang.prefijo == "es" ? "Usuario" : "User" }}
            </h4>
          </div>
          <div class="card-body">
            <h5 class="card-title">{{ $store.state.user.nombre_completo }}</h5>
            <p class="card-text">
              {{
                $store.state.user.hotel.siglas +
                " - " +
                $store.state.user.roles.nombre
              }}
              <br />{{ $store.state.user.puestos.departamento.nombre }} <br />{{
                $store.state.user.puestos.nombre
              }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    checklist: "",
    hotelchequeos: "",
    porcentaje: "",
    ok: "",
    fallando: "",
    nocompletado: "",
    ultimo: "",
  }),
  mounted: function () {
    this.checklistStatus();
  },
  methods: {
    checklistStatus() {
      axios
        .post("checklistuser?api_key=" + this.$store.state.api_key, {
          id: this.$store.state.user.hotel.id,
        })
        .then((res) => {
          this.checklist = res.data.hotelchecklist;
          this.hotelchequeos = res.data.hotelchequeos;
          this.ok = res.data.ok;
          this.fallando = res.data.fallando;
          this.nocompletado = res.data.nocompletado;
          this.ultimo = res.data.ultimo;
        });
    },
  },
};
</script>
