<template>
  <div
    style="padding: 10px; margin-bottom: 80px; max-width: 1300px"
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
              src="https://www.celebritrip.com/images/bodas_cancun_riviera/OCEAN_RIVIERA_PARADISE_LOGO(1).png"
              alt="Ocean by H10"
            />
            <hr />
            <h3 class="card-title">Ocean Riviera Paradise</h3>
            <p class="card-text">ORP <br />Playa del Carmen</p>
          </div>
        </div>
        <div class="card text-start">
          <h4 class="card-header bg-primary text-light">Check List ORP</h4>
          <div
            class="card-body"
            style="padding-left: 12px; padding-top: 0px; padding-bottom: 0px"
          >
            <div class="row">
              <div
                class="col-6 text-center border-end border-2"
                style="padding-top: 12px; padding-bottom: 12px"
              >
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOCAE382KD8n6GvWWl72LzQLGbmoT8rTBPHw&usqp=CAU"
                  class="img-fluid rounded-center"
                  alt="Checklist"
                />
              </div>
              <div class="col-6">
                <p class="card-text">
                  <b>Actividades: </b>10<br /><b>Realizadas: </b>5<br /><b
                    >Estado: </b
                  >50%
                </p>
                <p class="card-text">
                  OK: <b class="text-success">2</b><br />
                  Fallando: <b class="text-danger">2</b><br />
                  No Completado: <b>1</b>
                </p>
                <p class="card-text">
                  <small class="text-muted">Last updated 3 mins ago</small>
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
                  Ver Check List
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
            <h4>Usuario</h4>
          </div>
          <div class="card-body">
            <h5 class="card-title">Carlos Eduardo Cortes Fernandez</h5>
            <p class="card-text">ORP <br />Sistemas <br />Coordinador</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
</script>
