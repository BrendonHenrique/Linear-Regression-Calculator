<template>
  <div id="Navbar">
    <!-- <nav class="navbar navbar-expand-md">
      <a href='#' @click.prevent.stop="dispatchSalvar" v-b-tooltip.hover title="Salvar as amostras">
        <font-awesome-icon icon="cloud-upload-alt" class="fa-2x" />
      </a>
      <a href='#' @click.prevent.stop="dispatchReiniciar" v-b-tooltip.hover title="Reiniciar as amostras">
        <font-awesome-icon icon="sync" class="fa-2x" />
      </a>
      <a href='#' @click.prevent.stop="dispatchDownload" v-b-tooltip.hover title="Fazer Download em formato CSV">
        <font-awesome-icon icon="file-csv" class="fa-2x" />
      </a>
      <a href='#' @click.prevent.stop="dispatchDownloadPDF" v-b-tooltip.hover title="Fazer Download em formato PDF">
        <font-awesome-icon icon="file-pdf" class="fa-2x" />
      </a>
    </nav> -->
    <b-navbar class="navbar-expand-lg " toggleable="lg" variant="light" >
      <b-navbar-brand href="#">
        <img src="../../assets/garten.png" style="width:15rem;">
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>

          <b-nav-item href="#" style="margin-left:1rem;">

            <b-button variant="light">
              <span>
                <font-awesome-icon icon="cloud-upload-alt" class="fa-2x" />
              </span>
              Salvar
            </b-button>

          </b-nav-item>

          <b-nav-item href="#" style="margin-left:1rem;">
            <b-button variant="light">
              <span>
                <font-awesome-icon icon="sync" class="fa-2x" />
              </span>
              Reiniciar
            </b-button>
          </b-nav-item>

          <b-nav-item href="#" style="margin-left:1rem;">
            <b-button variant="light">
              <span>
                <font-awesome-icon icon="file-csv" class="fa-2x" />
              </span>
              Baixar CSV
            </b-button>
          </b-nav-item>

          <b-nav-item href="#" style="margin-left:1rem;">
            <b-button variant="light">
              <span>
                <font-awesome-icon icon="file-pdf" class="fa-2x" />
              </span>
              Baixar PDF
            </b-button>
          </b-nav-item>

        </b-navbar-nav>

      </b-collapse>
    </b-navbar>

  </div>
</template>
<script>
  import BootstrapVue from 'bootstrap-vue'
  export default {
    data() {
      return {}
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
