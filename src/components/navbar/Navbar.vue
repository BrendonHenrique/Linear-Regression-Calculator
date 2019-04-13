<template>
  <div id="Navbar">
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark static-top">
      <div class="container">
        <a class="navbar-brand" href="#">
          <img src="../../assets/garten2.svg" style="width:20rem;">
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
          aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">

            <li class="nav-item ">
              <a class="nav-link" @click.prevent="dispatchSalvar">
              <span>
                <font-awesome-icon icon="cloud-upload-alt" class="fa-2x" />
              </span>
              Salvar

              </a>
            </li>

            <li class="nav-item">
              <a class="nav-link" @click.prevent="dispatchReiniciar">
                <span>
                  <font-awesome-icon icon="sync" class="fa-2x" />
                </span>
                Reiniciar
              </a>
            </li>

            <li class="nav-item">
              <a class="nav-link" @click.prevent="dispatchDownload">
                <span>
                  <font-awesome-icon icon="file-csv" class="fa-2x" />
                </span>
                Baixar CSV
              </a>
            </li>

            <li class="nav-item">
              <a class="nav-link" @click.prevent="dispatchDownloadPDF">
                <span>
                  <font-awesome-icon icon="file-pdf" class="fa-2x" />
                </span>
                Baixar PDF
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!--
            <b-button variant="dark" v-b-tooltip.hover title="Salvar as amostras" @click.prevent="dispatchSalvar">
              <span>
                <font-awesome-icon icon="cloud-upload-alt" class="fa-2x" />
              </span>
              Salvar
            </b-button>



            <b-button variant="dark" v-b-tooltip.hover title="Reiniciar as amostras" @click.prevent="dispatchReiniciar">
              <span>
                <font-awesome-icon icon="sync" class="fa-2x" />
              </span>
              Reiniciar
            </b-button>


            <b-button variant="dark" v-b-tooltip.hover title="Fazer Download em formato CSV"
              @click.prevent="dispatchDownload">
              <span>
                <font-awesome-icon icon="file-csv" class="fa-2x" />
              </span>
              Baixar CSV
            </b-button>



            <b-button variant="dark" v-b-tooltip.hover title="Fazer Download em formato PDF"
              @click.prevent="dispatchDownloadPDF">
              <span>
                <font-awesome-icon icon="file-pdf" class="fa-2x" />
              </span>
              Baixar PDF
            </b-button> -->

  </div>
</template>
<script>
  import BootstrapVue from 'bootstrap-vue'

  export default {
    data() {
      return {
        float: true
      }
    },
    methods: {
      dispatchSalvar() {
        this.$emit('dispatchSalvar');
      },
      dispatchReiniciar() {
        this.$emit('dispatchReiniciar');
      },
      dispatchDownload() {
        this.$emit('dispatchDownload');
      },
      dispatchDownloadPDF() {
        this.$emit('dispatchDownloadPDF');
      }
    }
  }
</script>
