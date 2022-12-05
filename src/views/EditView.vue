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
                  @change="getChecklist(filtroHotel)"
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
          <h1>{{ Hotelselected.nombre }}</h1>
          <div class="card">
            <h4 class="card-header text-start">
              Check List
              {{ Hotelselected.siglas }}
            </h4>
            <div class="card-body">
              <h4 class="card-title">Chequeos Realizados el día de hoy</h4>
              <hr />
              <div class="bg-primary"><h2 class="text-light">Matutino</h2></div>
              <hr />
              <div class="row row-cols-1 row-cols-md-3 g-4">
                <div
                  class="col"
                  v-for="checklistm in checklistMat"
                  :key="checklistm.id"
                >
                  <div class="card text">
                    <div class="card-header text-start">
                      <h4>{{ checklistm.item }}</h4>
                    </div>
                    <div class="card-body">
                      <h4 class="card-title text-muted">
                        Estado:
                        <b
                          v-if="checklistm.estado == 'OK'"
                          class="text-success"
                          >{{ checklistm.estado }}</b
                        >
                        <b
                          v-if="checklistm.estado == 'Fallando'"
                          class="text-danger"
                          >{{ checklistm.estado }}</b
                        >
                        <b
                          v-if="checklistm.estado == 'No Completado'"
                          class="text-primary"
                          >{{ checklistm.estado }}</b
                        >
                      </h4>
                      <p class="card-text text-start">
                        <b>Observaciones: </b>{{ checklistm.observaciones
                        }}<br /><b>Tecnico: </b
                        >{{ checklistm.nombres + " " + checklistm.apellidos
                        }}<br /><b>Turno: </b>Matutino
                      </p>
                      <button
                        type="button"
                        @click="editarModal(checklistm.id)"
                        class="btn text-light btn-info"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        Editar Chequeo
                      </button>
                    </div>
                    <div class="card-footer text-muted">
                      Realizado el: {{ checklistm.created_at }}
                    </div>
                    <div
                      v-if="checklistm.updated_at"
                      class="card-footer text-muted"
                    >
                      Actualizado el: {{ checklistm.updated_at }}
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="checklistMat.length == 0" style="padding: 10px">
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
              <div class="row row-cols-1 row-cols-md-3 g-4">
                <div
                  class="col"
                  v-for="checklistv in checklistVes"
                  :key="checklistv.id"
                >
                  <div class="card text">
                    <div class="card-header text-start">
                      <h4>{{ checklistv.item }}</h4>
                    </div>
                    <div class="card-body">
                      <h4 class="card-title text-muted">
                        Estado:
                        <b
                          v-if="checklistv.estado == 'OK'"
                          class="text-success"
                          >{{ checklistv.estado }}</b
                        >
                        <b
                          v-if="checklistv.estado == 'Fallando'"
                          class="text-danger"
                          >{{ checklistv.estado }}</b
                        >
                        <b
                          v-if="checklistv.estado == 'No Completado'"
                          class="text-primary"
                          >{{ checklistv.estado }}</b
                        >
                      </h4>
                      <p class="card-text text-start">
                        <b>Observaciones: </b>{{ checklistv.observaciones
                        }}<br /><b>Tecnico: </b
                        >{{ checklistv.nombres + " " + checklistv.apellidos
                        }}<br /><b>Turno: </b>Vespertino
                      </p>
                      <button
                        type="button"
                        @click="editarModal(checklistv.id)"
                        class="btn text-light btn-info"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        Editar Chequeo
                      </button>
                    </div>
                    <div class="card-footer text-muted">
                      Realizado el: {{ checklistv.created_at }}
                    </div>
                    <div
                      v-if="checklistv.updated_at"
                      class="card-footer text-muted"
                    >
                      Actualizado el: {{ checklistv.updated_at }}
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="checklistVes.length == 0" style="padding: 10px">
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
              Check List {{ Hotelselected.nombre }}
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
                <h2>{{ editCheck.item + " " + editCheck.turno }}</h2>
              </div>
              <div class="card-body">
                <b class="card-title text-muted">{{ editCheck.descripcion }}</b>
                <form>
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
              @click="guardar()"
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
    filtroHotel: "",
    checklistMat: "",
    checklistVes: "",
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
    getChecklist(id) {
      this.hoteles.forEach((element) => {
        if (element.id == this.filtroHotel) {
          this.Hotelselected = element;
        }
      });
      axios
        .post("getChecklist?api_key=" + this.$store.state.api_key, {
          id: id,
          fecha: this.$store.state.hoy,
        })
        .then((res) => {
          this.checklistMat = res.data.checklistMat;
          this.checklistVes = res.data.checklistVes;
          document.getElementById("componente").style.display = "inline";
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
    guardar() {
      axios
        .post("updateCheck?api_key=" + this.$store.state.api_key, {
          id: this.editCheck.id,
          usuario_id: this.$store.state.user.id,
          item_id: this.editCheck.item_id,
          hotel_id: this.editCheck.cat_hotel_id,
          estado: this.editCheck.estado,
          observaciones: this.editCheck.observaciones,
          turno: this.editCheck.turno,
        })
        .then((res) => {
          if (res.data.error == true) {
            this.error = res.data.message;
            console.log(this.error);
          } else {
            console.log(res.data.message);
            this.getChecklist(this.Hotelselected.id);
          }
        });
    },
  },
};
</script>
