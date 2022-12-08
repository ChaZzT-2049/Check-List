<template>
  <div
    style="padding: 10px; margin-bottom: 80px; max-width: 900px"
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
                  v-model="filtro_Hotel"
                  class="form-select"
                  id="floatingSelect"
                  aria-label="Floating label select example"
                  @change="getChecklists(filtro_Hotel)"
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
          <h1 class="text-center">{{ Hotelselected.nombre }}</h1>
          <hr />
          <div v-show="checklists.length > 0" class="mb-3 text-start">
            <h3 class="header">Realizar Chequeo</h3>
            <div class="row">
              <div class="col-6 col-sm-8">
                <label class="form-label"
                  ><b>{{
                    $store.state.lang.prefijo == "es"
                      ? "Selecciona una Lista"
                      : "Select a Check List"
                  }}</b></label
                >
                <div class="form-floating">
                  <select
                    v-model="filtro_checklist"
                    class="form-select"
                    id="floatingSelect"
                    aria-label="Floating label select example"
                    @change="getItems(filtro_checklist)"
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
              <div id="boton" class="col-6 col-sm-4" style="display: none">
                <label class="form-label"
                  ><b>{{
                    $store.state.lang.prefijo == "es"
                      ? "Realizar Chequeo"
                      : "Perform Check"
                  }}</b></label
                ><br />
                <button
                  style="margin: 10px"
                  type="button"
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  {{
                    $store.state.lang.prefijo == "es"
                      ? "Comprobar"
                      : "Perform Check"
                  }}
                </button>
              </div>
              <div id="noboton" class="col-6 col-sm-4" style="display: none">
                <small>Este Check List no tiene Items</small>
              </div>
            </div>
          </div>
          <small v-show="checklists.length == 0"
            >{{ Hotelselected.siglas }} No tiene Check Lists</small
          >
          <hr />
          <div class="card" v-show="checklists.length > 0">
            <h4 class="card-header text-start">
              Listas de Comprobación
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
                    @change="getChequeos()"
                  />
                </div>
              </form>
              <h4 class="card-title">Check List Realizados el {{ fecha }}</h4>
              <hr />
              <div class="bg-primary"><h2 class="text-light">Matutino</h2></div>
              <hr />
              <div class="row row-cols-1 row-cols-md-2 g-4">
                <div
                  class="col"
                  v-for="checklist in checklists"
                  :key="checklist.id"
                >
                  <div class="card text">
                    <div class="card-header text-start border">
                      <h4>Check List {{ checklist.checklist }}</h4>
                    </div>
                    <div class="card-body">
                      <div v-for="chequeom in chequeosMat" :key="chequeom.id">
                        <div v-if="chequeom.checklist_id == checklist.id">
                          <div class="text-center">
                            <img
                              style="padding: 10px; max-width: 150px"
                              :src="
                                'http://localhost/storage/' + chequeom.evidencia
                              "
                              class="card-img-top"
                              alt=""
                            />
                          </div>
                          <h4 class="card-title text-start">
                            {{ chequeom.actividad }}
                          </h4>
                          <h5 class="text-muted">
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
                          </h5>
                          <p class="card-text text-start">
                            <b>Observaciones: </b>{{ chequeom.observaciones
                            }}<br /><b>Tecnico: </b
                            >{{ chequeom.nombres + " " + chequeom.apellidos
                            }}<br /><b>Turno: </b>Matutino
                          </p>
                          <div class="text-muted">
                            Realizado el: {{ chequeom.created_at }}
                          </div>
                          <div class="text-muted">
                            Actualizado el: {{ chequeom.updated_at }}
                          </div>
                          <hr />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="chequeosMat.length == 0" style="padding: 10px">
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
              <div class="row row-cols-1 row-cols-md-2 g-4">
                <div
                  class="col"
                  v-for="checklist in checklists"
                  :key="checklist.id"
                >
                  <div class="card text">
                    <div class="card-header text-start border">
                      <h4>Check List {{ checklist.checklist }}</h4>
                    </div>
                    <div class="card-body">
                      <div v-for="chequeov in chequeosVes" :key="chequeov.id">
                        <div v-if="chequeov.checklist_id == checklist.id">
                          <div class="text-center">
                            <img
                              style="padding: 10px; max-width: 150px"
                              :src="
                                'http://localhost/storage/' + chequeov.evidencia
                              "
                              class="card-img-top"
                              alt=""
                            />
                          </div>
                          <h4 class="card-title text-start">
                            {{ chequeov.actividad }}
                          </h4>
                          <h5 class="text-muted">
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
                          </h5>
                          <p class="card-text text-start">
                            <b>Observaciones: </b>{{ chequeov.observaciones
                            }}<br /><b>Tecnico: </b
                            >{{ chequeov.nombres + " " + chequeov.apellidos
                            }}<br /><b>Turno: </b>Matutino
                          </p>
                          <div class="text-muted">
                            Realizado el: {{ chequeov.created_at }}
                          </div>
                          <div class="text-muted">
                            Actualizado el: {{ chequeov.updated_at }}
                          </div>
                          <hr />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="chequeosVes.length == 0" style="padding: 10px">
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
              Check List {{ checklistselected.checklist }}
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
                      <h2>{{ item.actividad }}</h2>
                    </div>
                    <div class="card-body">
                      <b class="card-title text-muted">{{
                        item.descripcion
                      }}</b>
                      <form
                        :id="'saveForm' + item.id"
                        enctype="multipart/form-data"
                      >
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
                          <div :id="'container' + item.id" class="text-center">
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
    errores: [],
    hoteles: "",
    filtro_Hotel: "",
    filtro_checklist: "",
    Hotelselected: "",
    checklistselected: "",
    checklists: "",
    items: "",
    chequeosMat: "",
    chequeosVes: "",
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
    getChecklists(id) {
      if (this.filtro_Hotel == undefined) {
        document.getElementById("componente").style.display = "none";
      } else {
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
              this.getChequeos();
              document.getElementById("componente").style.display = "inline";
            }
          });
      }
    },
    getItems(id) {
      if (this.filtro_checklist != undefined) {
        this.items = "";
        this.estado = {};
        this.observaciones = {};
        this.turno = {};
        this.checklists.forEach((element) => {
          if (element.id == this.filtro_checklist) {
            this.checklistselected = element;
          }
        });
        axios
          .post("getItems?api_key=" + this.$store.state.api_key, {
            id: id,
          })
          .then((res) => {
            if (res.data.error == true) {
              document.getElementById("noboton").style.display = "inline";
              document.getElementById("boton").style.display = "none";
            } else {
              document.getElementById("noboton").style.display = "none";
              document.getElementById("boton").style.display = "inline";
              this.items = res.data.items;
              this.items.forEach((element) => {
                this.estado[element.id] = "";
                this.observaciones[element.id] = "";
                this.turno[element.id] = "";
              });
            }
          });
      } else {
        document.getElementById("boton").style.display = "none";
      }
    },
    getChequeos() {
      axios
        .post("getChequeos?api_key=" + this.$store.state.api_key, {
          id: this.filtro_Hotel,
          fecha: this.fecha,
        })
        .then((res) => {
          if (res.data.error == true) {
            window.$("#titulo").empty();
            window.$("#mensaje").empty();

            window.$("#toast").toggleClass("show");
            window.$("#titulo").append("Alerta");
            window
              .$("#mensaje")
              .append(res.data.message + this.Hotelselected.siglas);

            setTimeout(function () {
              window.$("#toast").toggleClass("show");
            }, 2000);
          } else {
            this.chequeosMat = res.data.chequeosMat;
            this.chequeosVes = res.data.chequeosVes;
          }
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
      this.errores = [];
      this.items.forEach((element) => {
        const evidencia = document.querySelector("#evidencia" + element.id);
        const imagen = document.querySelector("#imagen" + element.id);
        let data = new FormData(window.$("#saveForm" + element.id)[0]);
        data.append("item_id", element.id);
        data.append("usuario_id", this.$store.state.user.id);
        data.append("estado", this.estado[element.id]);
        data.append("observaciones", this.observaciones[element.id]);
        if (evidencia.files[0]) {
          data.append("evidencia", evidencia.files[0]);
        }
        data.append("turno", this.turno[element.id]);
        axios
          .post("storeCheck?api_key=" + this.$store.state.api_key, data, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((res) => {
            if (res.data.error == true) {
              data = null;
              this.estado[element.id] = "";
              this.observaciones[element.id] = "";
              this.turno[element.id] = "";
              window.$("#ok" + element.id).prop("checked", false);
              window.$("#fallando" + element.id).prop("checked", false);
              window.$("#nocom" + element.id).prop("checked", false);
              window.$("#evidencia" + element.id).val("");
              imagen.src = URL.revokeObjectURL("");
              this.errores.push({ actividad: res.data.item[0].actividad });
              this.getChequeos();
            } else {
              data = null;
              this.estado[element.id] = "";
              this.observaciones[element.id] = "";
              this.turno[element.id] = "";
              window.$("#ok" + element.id).prop("checked", false);
              window.$("#fallando" + element.id).prop("checked", false);
              window.$("#nocom" + element.id).prop("checked", false);
              window.$("#evidencia" + element.id).val("");
              imagen.src = URL.revokeObjectURL("");
              console.log(res.data.message);
              this.getChequeos();
            }
          });
      });
      if (this.errores) {
        console.log(this.errores);
        window.$("#tituloerror").empty();
        window.$("#mensajeerror").empty();

        window.$("#toasterror").toggleClass("show");
        window.$("#tituloerror").append("Error");
        window.$("#mensajeerror").append("Campos requeridos");
        setTimeout(function () {
          window.$("#toasterror").toggleClass("show");
        }, 2000);
      }
    },
  },
};
</script>
