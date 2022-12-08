<template>
  <div
    style="padding: 20px; margin-bottom: 80px; max-width: 900px"
    class="container-fluid mh-100"
  >
    <div class="card text-center">
      <div class="card-header">
        <h1>Editar Check List</h1>
      </div>
      <div class="card-body">
        <div class="mx-auto text-center" style="max-width: 800px">
          <form>
            <div class="mb-3 text-start">
              <label class="form-label"
                ><b>{{
                  $store.state.lang.prefijo == "es"
                    ? "Selecciona un Hotel"
                    : "Select an Hotel"
                }}</b></label
              >
              <div class="form-floating">
                <select
                  v-model="filtroHotel"
                  class="form-select"
                  id="floatingSelect"
                  aria-label="Floating label select example"
                  @change="getChecklists(filtroHotel)"
                >
                  <option
                    v-for="hotel in hoteles"
                    :key="hotel.id"
                    :value="hotel.id"
                  >
                    {{ hotel.nombre }}
                  </option>
                </select>
                <label for="floatingSelect">{{
                  $store.state.lang.prefijo == "es"
                    ? "Elige un Hotel"
                    : "Choose an Hotel"
                }}</label>
              </div>
            </div>
          </form>
        </div>
        <hr />
        <div id="componente" style="display: none">
          <div
            style="padding: 10px"
            v-show="checklists.length > 0"
            class="mb-3 text-start"
          >
            <label class="form-label"
              ><b>{{
                $store.state.lang.prefijo == "es"
                  ? "Selecciona una Lista"
                  : "Select a Check List"
              }}</b></label
            >
            <div class="form-floating">
              <select
                v-model="filtro_chequeos"
                class="form-select"
                id="floatingSelect"
                aria-label="Floating label select example"
                @change="getChequeos(filtro_chequeos)"
              >
                <option
                  v-for="checklist in checklists"
                  :key="checklist.id"
                  :value="checklist.id"
                >
                  {{ checklist.checklist }}
                </option>
              </select>
              <label for="floatingSelect">{{
                $store.state.lang.prefijo == "es"
                  ? "Elige un Check List"
                  : "Choose a Check List"
              }}</label>
            </div>
          </div>
          <h1>{{ Hotelselected.nombre }}</h1>
          <div v-show="checklistselected" class="card">
            <h4 class="card-header text-start">
              Check List
              {{ checklistselected.checklist }}
            </h4>
            <div class="card-body">
              <h5 class="card-title">Check List Actual</h5>
              <hr />
              <div class="bg-primary"><h2 class="text-light">Matutino</h2></div>
              <hr />
              <div class="row row-cols-1 row-cols-md-2 g-4">
                <div
                  class="col"
                  v-for="chequeom in chequeosMat"
                  :key="chequeom.id"
                >
                  <div class="card text">
                    <div class="card-header text-start">
                      <h4>{{ chequeom.actividad }}</h4>
                    </div>
                    <div class="text-center">
                      <img
                        style="padding: 10px; max-width: 150px"
                        :src="'http://localhost/storage/' + chequeom.evidencia"
                        class="card-img-top"
                        alt=""
                      />
                    </div>
                    <div class="card-body">
                      <h4 class="card-title text-muted">
                        Estado:
                        <b
                          v-if="chequeom.estado == 'OK'"
                          class="text-success"
                          >{{ chequeom.estado }}</b
                        >
                        <b
                          v-if="chequeom.estado == 'Fallando'"
                          class="text-danger"
                          >{{ chequeom.estado }}</b
                        >
                        <b
                          v-if="chequeom.estado == 'No Completado'"
                          class="text-primary"
                          >{{ chequeom.estado }}</b
                        >
                      </h4>
                      <p class="card-text text-start">
                        <b>Observaciones: </b>{{ chequeom.observaciones
                        }}<br /><b>Tecnico: </b
                        >{{ chequeom.nombres + " " + chequeom.apellidos
                        }}<br /><b>Turno: </b>Matutino
                      </p>
                      <button
                        type="button"
                        @click="editarModal(chequeom.id)"
                        class="btn text-light btn-info"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        Editar Chequeo
                      </button>
                    </div>
                    <div class="card-footer text-muted">
                      Realizado el: {{ chequeom.created_at }}
                    </div>
                    <div
                      v-if="chequeom.updated_at"
                      class="card-footer text-muted"
                    >
                      Actualizado el: {{ chequeom.updated_at }}
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="chequeosMat.length == 0" style="padding: 10px">
                <h4 class="text-muted">
                  No se ha realizado un Check List Matutino en
                  {{ Hotelselected.siglas }} el día de hoy.
                </h4>
              </div>
              <hr />
              <div class="bg-primary">
                <h2 class="text-light">Vespertino</h2>
              </div>
              <hr />
              <div class="row row-cols-1 row-cols-md-2 g-4">
                <div
                  class="col"
                  v-for="chequeov in chequeosVes"
                  :key="chequeov.id"
                >
                  <div class="card text">
                    <div class="card-header text-start">
                      <h4>{{ chequeov.actividad }}</h4>
                    </div>
                    <div class="text-center">
                      <img
                        style="padding: 10px; max-width: 150px"
                        :src="'http://localhost/storage/' + chequeov.evidencia"
                        class="card-img-top"
                        alt=""
                      />
                    </div>
                    <div class="card-body">
                      <h4 class="card-title text-muted">
                        Estado:
                        <b
                          v-if="chequeov.estado == 'OK'"
                          class="text-success"
                          >{{ chequeov.estado }}</b
                        >
                        <b
                          v-if="chequeov.estado == 'Fallando'"
                          class="text-danger"
                          >{{ chequeov.estado }}</b
                        >
                        <b
                          v-if="chequeov.estado == 'No Completado'"
                          class="text-primary"
                          >{{ chequeov.estado }}</b
                        >
                      </h4>
                      <p class="card-text text-start">
                        <b>Observaciones: </b>{{ chequeov.observaciones
                        }}<br /><b>Tecnico: </b
                        >{{ chequeov.nombres + " " + chequeov.apellidos
                        }}<br /><b>Turno: </b>Vespertino
                      </p>
                      <button
                        type="button"
                        @click="editarModal(chequeov.id)"
                        class="btn text-light btn-info"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        Editar Chequeo
                      </button>
                    </div>
                    <div class="card-footer text-muted">
                      Realizado el: {{ chequeov.created_at }}
                    </div>
                    <div
                      v-if="chequeov.updated_at"
                      class="card-footer text-muted"
                    >
                      Actualizado el: {{ chequeov.updated_at }}
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="chequeosVes.length == 0" style="padding: 10px">
                <h4 class="text-muted">
                  No se ha realizado un Check List Vespertino en
                  {{ Hotelselected.siglas }} el día de hoy.
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Check List
              {{ checklistselected.checklist + " " + editCheck.turno }}
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <h5 class="text-danger">{{ error }}</h5>
            <div class="card text-center" style="margin-bottom: 10px">
              <div class="card header">
                <h2>{{ editCheck.actividad }}</h2>
              </div>
              <div class="card-body">
                <b class="card-title text-muted">{{ editCheck.descripcion }}</b>
                <form id="editForm" enctype="multipart/form-data">
                  <div class="mb-3 text-start">
                    <label class="form-label">Estado</label>
                    <div class="form-check">
                      <input
                        v-model="editCheck.estado"
                        type="radio"
                        class="btn-check"
                        name="options-outlined"
                        id="ok"
                        autocomplete="off"
                        value="OK"
                      />
                      <label
                        style="margin: 2px"
                        class="btn btn-outline-success"
                        for="ok"
                        >OK</label
                      >

                      <input
                        v-model="editCheck.estado"
                        type="radio"
                        class="btn-check"
                        name="options-outlined"
                        id="fallando"
                        autocomplete="off"
                        value="Fallando"
                      />
                      <label
                        style="margin: 2px"
                        class="btn btn-outline-danger"
                        for="fallando"
                        >Fallando</label
                      >

                      <input
                        v-model="editCheck.estado"
                        type="radio"
                        class="btn-check"
                        name="options-outlined"
                        id="nocom"
                        autocomplete="off"
                        value="No Completado"
                      />
                      <label
                        style="margin: 2px"
                        class="btn btn-outline-primary"
                        for="nocom"
                        >No Completado</label
                      >
                    </div>
                  </div>
                  <div class="mb-3 text-start">
                    <label class="form-label">Evidencia Nueva</label>
                    <input
                      @change="mostrarImg()"
                      class="form-control"
                      accept="image/*"
                      capture="evidencia"
                      type="file"
                      id="evidencia"
                    />
                    <div class="text-center">
                      <img
                        id="imagen"
                        style="padding: 10px; max-width: 150px"
                        :src="'http://localhost/storage/' + editCheck.evidencia"
                        class="card-img"
                        alt=""
                      />
                      <p style="display: inline" id="ev">Evidencia anterior</p>
                    </div>
                    <label class="form-label">Observaciones</label>
                    <div class="form-floating">
                      <textarea
                        v-model="editCheck.observaciones"
                        class="form-control"
                        placeholder="Leave a comment here"
                        id="observaciones"
                        style="height: 100px"
                      />
                      <label class="text-muted" for="observaciones"
                        ><small>Escribir Observaciones</small></label
                      >
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              @click="editar()"
            >
              Subir
            </button>
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
    hoteles: "",
    Hotelselected: "",
    checklists: "",
    checklistselected: "",
    filtroHotel: "",
    filtro_chequeos: "",
    chequeosMat: "",
    chequeosVes: "",
    editCheck: "",
    error: "",
  }),
  mounted: function () {
    this.getHoteles();
  },
  methods: {
    getHoteles() {
      axios
        .get("getHoteles?api_key=" + this.$store.state.api_key)
        .then((res) => {
          this.hoteles = res.data.hoteles;
        });
    },
    getChecklists(id) {
      this.hoteles.forEach((element) => {
        if (element.id == this.filtro_Hotel) {
          this.Hotelselected = element;
        }
      });
      axios
        .post("getChecklists?api_key=" + this.$store.state.api_key, {
          id: id,
        })
        .then((res) => {
          if (res.data.error == true) {
            console.log(res.data.message);
          } else {
            this.checklists = res.data.checklists;
            //this.getChequeos();
            document.getElementById("componente").style.display = "inline";
          }
        });
    },
    getChequeos() {
      this.checklists.forEach((element) => {
        if (element.id == this.filtro_chequeos) {
          this.checklistselected = element;
        }
      });
      axios
        .post("getChecklistRegistro?api_key=" + this.$store.state.api_key, {
          id: this.filtro_chequeos,
        })
        .then((res) => {
          this.chequeosMat = res.data.chequeosMat;
          this.chequeosVes = res.data.chequeosVes;
        });
    },
    editarModal(id) {
      axios
        .post("editCheck?api_key=" + this.$store.state.api_key, {
          id: id,
        })
        .then((res) => {
          this.editCheck = res.data[0];
          if (this.editCheck.estado == "OK") {
            window.$("#ok").prop("checked", true);
          }
          if (this.editCheck.estado == "Fallando") {
            window.$("#fallando").prop("checked", true);
          }
          if (this.editCheck.estado == "No Completado") {
            window.$("#nocom").prop("checked", true);
          }
        });
    },
    mostrarImg() {
      const imagen = document.querySelector("#imagen");
      const evidencia = document.querySelector("#evidencia");
      if (evidencia.files[0]) {
        document.getElementById("ev").style.display = "none";
        imagen.src = URL.createObjectURL(evidencia.files[0]);
      } else {
        imagen.src = "http://localhost/storage/" + this.editCheck.evidencia;
      }
    },
    editar() {
      const evidencia = document.querySelector("#evidencia");
      const imagen = document.querySelector("#imagen");
      let data = new FormData(window.$("#editForm")[0]);
      data.append("id", this.editCheck.id);
      data.append("item_id", this.editCheck.item_id);
      data.append("usuario_id", this.$store.state.user.id);
      data.append("estado", this.editCheck.estado);
      data.append("observaciones", this.editCheck.observaciones);
      if (evidencia.files[0]) {
        data.append("evidencia", evidencia.files[0]);
      }
      data.append("turno", this.editCheck.turno);
      axios
        .post("updateCheck?api_key=" + this.$store.state.api_key, data, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          if (res.data.error == true) {
            this.error = res.data.message;
            data = null;
            window.$("#ok").prop("checked", false);
            window.$("#fallando").prop("checked", false);
            window.$("#nocom").prop("checked", false);
            window.$("#evidencia").val("");
            imagen.src = URL.revokeObjectURL("");
            this.getChequeos();
          } else {
            console.log(res.data.message);
            data = null;
            window.$("#ok").prop("checked", false);
            window.$("#fallando").prop("checked", false);
            window.$("#nocom").prop("checked", false);
            window.$("#evidencia").val("");
            imagen.src = URL.revokeObjectURL("");
            this.getChequeos();
          }
        });
    },
  },
};
</script>
