<template>
  <div id="Navbar">
    <nav class="navbar navbar-expand-md">
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
    </nav>
  </div>
</template>
<script>
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

<style>
  a {
    margin-top: -2rem;
    padding-bottom: 3rem;
  }


  #Navbar {
    white-space: nowrap;
    height: 0rem;
    width: 20rem;
    margin: 2.3rem auto;
  }

  #Navbar a {
    background-image: linear-gradient(#485258, #30383c);
    width: 5rem;
    height: 3rem;
    text-decoration: none;
    padding-top: 0.6rem;
    outline-width: 0rem;
    z-index: 990;
    color: white;
    text-align: center;
    line-height: 1.2;
  }

  #Navbar a:not(.active) {
    box-shadow:
      inset 0 0.07rem 0.07rem rgba(255, 255, 255, 0.1),
      inset 0 -0.07rem 0 100rem  rgba(0, 0, 0, 0.2),
      0 0.7rem 1.23rem 0 rgba(0, 0, 0, 0.3),
      0 0.3rem 0.23rem 0 rgba(0, 0, 0, 0.3),
      0 0 0 0.07rem rgba(0, 0, 0, .2);

    text-shadow: 0 0 1.6rem rgba(223, 206, 228, 0.5), 0 -0.07rem 0 #311d47;
  }

  #Navbar a:not(.active):hover,
  #Navbar a:not(.active):focus {
    color: #86c6ef;
    text-shadow: 0 0 0.15rem rgba(255, 255, 255, .2);
  }

  #Navbar a:not(.active):active {
    color: #86c6ef !important;
    background: #313335;
    text-shadow: 0 0 0 1.6rem #618398, 0 0 1.15rem #618398, 0 0 0.14rem #fff, 0 0 0.07rem #000, 0 0 0.4rem #618398;
    color: #86c6ef;
  }

  #Navbar a.active,
  #Navbar a:active {
    box-shadow:
      0 0.7rem 1.2rem 0 rgba(0, 0, 0, 0.1),
      0 0 0 0.07rem rgba(0, 0, 0, .6),
      0 0.15rem 0.07rem 0 rgba(255, 255, 255, 0.05),
      inset 0 0 0.3rem 0.31rem rgba(0, 0, 0, 0.2),
      inset 0 0 0.76rem rgba(0, 0, 0, .5);
    background: #313335;
    text-shadow: 0 0 0.38rem #618398, 0 0 1.61rem #618398, 0 0 1.15rem #618398, 0 0 0.15rem #fff, 0 0 0.07rem #000, 0 0 0.38rem #618398, 0 -0.07rem 0 #fff, 0 0.07rem 0 #000;
    color: #86c6ef;
  }

  #Navbar a.active:before,
  #Navbar a:active:before {

    background: linear-gradient(to bottom, #485258 0%, #485258 15%, #86c6ef 50%, #86c6ef 50%, #86c6ef 51%, #30383c 85%, #30383c 100%);
    width: 0.07rem;
    height: 3rem;
    top: 0.07rem;
    left: -0.14rem;
    box-shadow: 0 0 0 rgba(134, 199, 239, .2), 0 0 0.07rem rgba(255, 255, 255, .2), 0 0 0.38rem rgba(255, 255, 255, .4);
  }

  #Navbar a.active:after,
  #Navbar a:active:after {

    display: block;
    width: 0.07rem;
    height: 13rem;
    top: 0.07rem;
    right: -0.14rem;
    background: linear-gradient(to bottom, #485258 0%, #485258 15%, #86c6ef 50%, #86c6ef 50%, #86c6ef 51%, #30383c 85%, #30383c 100%);
    /* W3C */
    box-shadow: 0 0 0 rgba(134, 199, 239, .2), 0 0 0.07rem rgba(255, 255, 255, .2), 0 0 0.38rem rgba(255, 255, 255, .4);
  }

  #Navbar a:last-child:active:after {
    box-shadow: 0 0 0;
    background: transparent
  }

  #Navbar a:first-child:active:before {
    box-shadow: 0 0 0;
    background: transparent
  }

  #Navbar a.active {
    z-index: 999
  }

  #Navbar a:active {
    z-index: 999
  }

  #Navbar a:last-of-type {
    -webkit-border-radius: 0 0.53rem 0.53rem 0;
    -moz-border-radius: 0 0.53rem 0.53rem 0;
    -ms-border-radius: 0 0.53rem 0.53rem 0;
    -o-border-radius: 0 0.53rem 0.53rem 0;
    border-radius: 0 0.53rem 0.53rem 0;
  }

  #Navbar a:first-of-type {
    -webkit-border-radius: 0.53rem 0 0 0.53rem;
    -moz-border-radius: 0.53rem 0 0 0.53rem;
    -ms-border-radius: 0.53rem 0 0 0.53rem;
    -o-border-radius: 0.53rem 0 0 0.53rem;
    border-radius: 0.53rem 0 0 0.53rem;
    left: 0;
  }

  #Navbar a:nth-of-type(2) {
    left: 5.15rem
  }

  #Navbar a:nth-of-type(3) {
    left: 10.3rem
  }

  #Navbar a:nth-of-type(4) {
    left: 15.38rem
  }

  #Navbar a:nth-of-type(5) {
    left: 20.53rem
  }

  #Navbar a:nth-of-type(6) {
    left: 19.61rem
  }

  #Navbar a:nth-of-type(7) {
    left: 23.53rem
  }

  #Navbar a:nth-of-type(8) {
    left: 27.46rem
  }

  #Navbar a i:before {
    margin-left: 0.14rem;
    font-size: 1.69rem;
  }

  a span svg {
    width: 1.38rem;
    stroke-width: 1.5;
    margin-top: -0.14rem;
  }
</style>
