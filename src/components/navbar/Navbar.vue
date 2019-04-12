<template>
  <div id="Navbar">
    <b-navbar toggleable="lg" type="dark" variant="dark">
       <b-navbar-brand href="#">
        <img src="../../assets/garten2.svg" style="width:20rem; margin-left:-2rem;">
      </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse" @click="float = !float"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
     
      <!-- <b-navbar-nav :style=" !float ? 'margin-left:60%' : '' "> -->
      <b-navbar-nav v-bind:style=" float == true ? [{'margin-left':'45%'}] : {} ">
        <b-nav-item href="#">
          <b-button variant="dark" v-b-tooltip.hover title="Salvar as amostras" @click.prevent="dispatchSalvar">
            <span>
              <font-awesome-icon icon="cloud-upload-alt" class="fa-2x" />
            </span>
            Salvar
          </b-button>
        </b-nav-item>
        <b-nav-item href="#">
          <b-button variant="dark" v-b-tooltip.hover title="Reiniciar as amostras" @click.prevent="dispatchReiniciar">
            <span>
              <font-awesome-icon icon="sync" class="fa-2x" />
            </span>
            Reiniciar
          </b-button>
        </b-nav-item>
        <b-nav-item href="#">
          <b-button variant="dark" v-b-tooltip.hover title="Fazer Download em formato CSV"
            @click.prevent="dispatchDownload">
            <span>
              <font-awesome-icon icon="file-csv" class="fa-2x" />
            </span>
            Baixar CSV
          </b-button>
        </b-nav-item>
        <b-nav-item href="#">
          <b-button variant="dark" v-b-tooltip.hover title="Fazer Download em formato PDF"
            @click.prevent="dispatchDownloadPDF">
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
      return {
        float : true
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
