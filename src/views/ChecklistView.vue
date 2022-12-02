<template>
  <div
    style="padding: 10px; margin-bottom: 80px; max-width: 1300px"
    class="container-fluid mh-100"
  >
    <div class="card text-center">
      <div class="card-header">
        <h1>Check List</h1>
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
                  @change="getItems(filtroHotel)"
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
          <button
            v-if="items.length > 0"
            style="margin: 10px"
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            {{
              $store.state.lang.prefijo == "es"
                ? "Realizar Check List"
                : "Perform Check List"
            }}
          </button>
          <div class="card">
            <h4 class="card-header text-start">
              Check List
              {{ Hotelselected.siglas }}
            </h4>
            <div class="card-body">
              <form>
                <div class="mx-auto mb-3 text-start" style="max-width: 800px">
                  <label for="fecha"
                    ><b>{{
                      $store.state.lang.prefijo == "es"
                        ? "Selecciona una Fecha"
                        : "Select a Date"
                    }}</b></label
                  >
                  <input
                    v-model="fecha"
                    class="form-control"
                    type="date"
                    name="fecha"
                    id="fecha"
                    @change="getChecklist()"
                  />
                </div>
              </form>
              <h4 class="card-title">Chequeos Realizados el {{ fecha }}</h4>
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
                  {{ Hotelselected.siglas + " el " + fecha }}
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
                  {{ Hotelselected.siglas + " el " + fecha }}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
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
            <div
              id="carouselExampleControls"
              class="carousel carousel-dark slide"
              data-bs-ride="false"
            >
              <div class="carousel-inner" style="padding: 20px">
                <div class="carousel-item active">
                  <div class="header text-center">
                    <h1>Desliza para evaluar las Actividades</h1>
                  </div>
                </div>
                <div class="carousel-item" v-for="item in items" :key="item.id">
                  <div class="card text-center" style="margin-bottom: 10px">
                    <div class="card header">
                      <h2>{{ item.item }}</h2>
                    </div>
                    <div class="card-body">
                      <b class="card-title text-muted">{{
                        item.descripcion
                      }}</b>
                      <form enctype="multipart/form-data">
                        <div class="mb-3 text-start">
                          <label class="form-label">Turno</label>
                          <div class="form-floating">
                            <select
                              required
                              v-model="turno[item.id]"
                              class="form-select"
                              :id="'turno' + item.id"
                              aria-label="Default select example"
                            >
                              <option value="Matutino">Matutino</option>
                              <option value="Vespertino">Vespertino</option>
                            </select>
                            <label :for="'turno' + item.id"
                              >Elige un turno</label
                            >
                          </div>
                        </div>
                        <div class="mb-3 text-start">
                          <label class="form-label">Estado</label>
                          <div class="form-check">
                            <input
                              v-model="estado[item.id]"
                              type="radio"
                              class="btn-check"
                              name="estado"
                              :id="'ok' + item.id"
                              autocomplete="off"
                              value="OK"
                              required
                            />
                            <label
                              style="margin: 2px"
                              class="btn btn-outline-success"
                              :for="'ok' + item.id"
                              >OK</label
                            >

                            <input
                              v-model="estado[item.id]"
                              type="radio"
                              class="btn-check"
                              name="estado"
                              :id="'fallando' + item.id"
                              autocomplete="off"
                              value="Fallando"
                              required
                            />
                            <label
                              style="margin: 2px"
                              class="btn btn-outline-danger"
                              :for="'fallando' + item.id"
                              >Fallando</label
                            >

                            <input
                              v-model="estado[item.id]"
                              type="radio"
                              class="btn-check"
                              name="estado"
                              :id="'nocom' + item.id"
                              autocomplete="off"
                              value="No Completado"
                              required
                            />
                            <label
                              style="margin: 2px"
                              class="btn btn-outline-primary"
                              :for="'nocom' + item.id"
                              >No Completado</label
                            >
                          </div>
                        </div>
                        <div class="mb-3 text-start">
                          <label for="evidencia" class="form-label"
                            >Añade una imagen de evidencia</label
                          >
                          <input
                            @change="mostrarImg()"
                            class="form-control"
                            accept="image/*"
                            capture="evidencia"
                            type="file"
                            :id="'evidencia' + item.id"
                          />
                          <div class="text-center">
                            <img
                              style="max-width: 200px; padding: 10px"
                              :id="'imagen' + item.id"
                              class="imagen"
                            />
                          </div>
                        </div>
                        <div class="mb-3 text-start">
                          <label class="form-label">Observaciones</label>
                          <div class="form-floating">
                            <textarea
                              v-model="observaciones[item.id]"
                              class="form-control"
                              placeholder="Leave a comment here"
                              :id="'observaciones' + item.id"
                              style="height: 100px"
                              required
                            ></textarea>
                            <label
                              class="text-muted"
                              :for="'observaciones' + item.id"
                              ><small>Escribir Observaciones</small></label
                            >
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <button
                class="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="prev"
              >
                <span
                  class="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button
                class="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="next"
              >
                <span
                  class="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Next</span>
              </button>
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
    filtroHotel: "",
    Hotelselected: "",
    items: "",
    checklistMat: "",
    checklistVes: "",
    fecha: "",
    estado: {},
    observaciones: {},
    turno: {},
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
          this.fecha = this.$store.state.hoy;
        });
    },
    getItems(id) {
      if (this.filtroHotel == undefined) {
        document.getElementById("componente").style.display = "none";
      } else {
        this.hoteles.forEach((element) => {
          if (element.id == this.filtroHotel) {
            this.Hotelselected = element;
          }
        });
        axios
          .post("getItems?api_key=" + this.$store.state.api_key, {
            id: id,
          })
          .then((res) => {
            this.items = res.data.items;
            this.getChecklist();
            this.estado = {};
            this.observaciones = {};
            this.turno = {};
            this.items.forEach((element) => {
              this.estado[element.id] = null;
              this.observaciones[element.id] = null;
              this.turno[element.id] = null;
            });
          });
        document.getElementById("componente").style.display = "inline";
      }
    },
    getChecklist() {
      axios
        .post("getChecklist?api_key=" + this.$store.state.api_key, {
          id: this.Hotelselected.id,
          fecha: this.fecha,
        })
        .then((res) => {
          this.checklistMat = res.data.checklistMat;
          this.checklistVes = res.data.checklistVes;
        });
    },
    mostrarImg() {
      this.items.forEach((element) => {
        const imagen = document.querySelector("#imagen" + element.id);
        const evidencia = document.querySelector("#evidencia" + element.id);
        if (evidencia.files[0]) {
          imagen.src = URL.createObjectURL(evidencia.files[0]);
        }
      });
    },
    guardar() {
      let chequeos = [];
      this.items.forEach((element) => {
        const evidencia = document.querySelector("#evidencia" + element.id);
        const img = evidencia.files[0];
        chequeos.push({
          cat_hotel_id: element.cat_hotel_id,
          item_id: element.id,
          usuario_id: this.$store.state.user.id,
          estado: this.estado[element.id],
          observaciones: this.observaciones[element.id],
          evidencia: img,
          turno: this.turno[element.id],
        });
      });
      console.log(chequeos);
      axios
        .post("storeChecklist?api_key=" + this.$store.state.api_key, {
          headers: { "Content-Type": "multipart/form-data" },
          chequeos,
        })
        .then((res) => {
          if (res.data.error == true) {
            chequeos = [];
            this.estado = {};
            this.observaciones = {};
            this.turno = {};
            console.log(res.data.item[0].item);
            console.log(res.data);
            this.getChecklist();
          } else {
            console.log(res.data);
            this.getChecklist();
          }
        });
    },
  },
};
</script>
