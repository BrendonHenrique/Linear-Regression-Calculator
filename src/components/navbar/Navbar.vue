<template>
    <div id="Navbar">
      <nav class="navbar">
        <a class="navbar-brand" href="http://garten.com.br/">
          <img src="../../assets/garten.png" alt="garten automação" title="Garten">
        </a>
        <div class="btn-group" style="right:17%;">
          <button type="button" class="btn-lg btn-secondary dropdown-toggle"
          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Menu
          </button>

          <div class="dropdown-menu dropdown-menu-right" >
            <button type="button" class="dropdown-item" data-toggle="tooltip" data-placement="right"
            title="Clique para gerar um código" @click="dispatchSalvar"><h3>Salvar</h3></button>
          <button type="confirm" class="dropdown-item " data-toggle="tooltip" data-placement="right"
            title="Clique para reiniciar a tabela" @click="dispatchReiniciar"><h3>Reiniciar</h3></button>
          <button type="confirm" class="dropdown-item" data-toggle="tooltip" data-placement="right"
            title="Clique para reiniciar a tabela" @click="dispatchDownload"><h3>Exportar em Csv</h3></button>
          </div>
        </div>
      </nav>
    </div>
</template>
<script>

import 'bootstrap/dist/css/bootstrap.css'

  export default {
    data(){
      return{

      }
    },
    methods:{
      dispatchSalvar() {
        this.$emit('dispatchSalvar');
      },
      dispatchReiniciar(){
        this.$emit('dispatchReiniciar');
      },
      dispatchDownload(){
        this.$emit('dispatchDownload');
      }

    }
  }
</script>

<style>

button , .dropdown-menu{
  background-color:rgba(169,188,208,0.2);
}
h3{
  color:grey;
}

img {
  width: 70%;
  height: auto;
}
</style>
