<template>
  <div class="container">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css?family=Oxygen:400,300,700" rel="stylesheet" type="text/css" />
    <link href="https://code.ionicframework.com/ionicons/1.4.1/css/ionicons.min.css" rel="stylesheet" type="text/css" />
    <div class="signin cf">

      <div class="avatar">
        <img src="../../assets/garten2.svg" style="height: 5rem;
          margin-left: -8.4rem;
          margin-top: 5rem;">
      </div>

      <!-- Form de cadastro -->
      <form>
        <div class="inputrow">
          <label class="ion-person" for="name"></label>
          <input type="text" id="name" placeholder="Usuario" v-model="usuario" required />
        </div>

        <div class="inputrow">
          <label class="ion-locked" for="pass"></label>
          <input type="password" id="pass" placeholder="Senha" v-model="senha" required />
        </div>

        <div class="inputrow">
          <label class="ion-locked" for="pass"></label>
          <input type="password" id="confirmPass" placeholder="Confirme a senha" v-model="senhaDeConfirmacao"
            v-bind:style="[ this.senha == this.senhaDeConfirmacao ? {'border-color': 'white'} : {'border-color': 'red'}]"
            required />
        </div>

        <div class="inputrow">
          <label class="ion-email" for="email"></label>
          <input type="email" id="email" placeholder="E-mail" v-model="email" required />
        </div>

        <div class="inputrow">
          <label class="ion-email" for="email"></label>
          <input type="tel" id="telefone" placeholder="Telefone" v-model="telefone" required />
        </div>
        <input type="submit" value="Fazer cadastro" @click.prevent="validarSenhas" />
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        usuario: '',
        senha: '',
        senhaDeConfirmacao: '',
        email: '',
        telefone: ''
      }
    },
    computed: {}
  }
</script>

<style>
  html,
  body {
    min-height: 100%;
    font-family: Oxygen;
    font-weight: 300;
    font-size: 1em;
    color: #fff;
  }

  body {
    background: #2e3441;
    background-image: -webkit-radial-gradient(top, circle cover, #4e7a89, #2e3441 80%);
    background-image: -moz-radial-gradient(top, circle cover, #4e7a89, #2e3441 80%);
    background-image: -o-radial-gradient(top, circle cover, #4e7a89, #2e3441 80%);
    background-image: radial-gradient(top, circle cover, #4e7a89, #2e3441 80%);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .signin {
    display: block;
    position: relative;
    width: 350px;
    margin: 20px auto;
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.1);
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    -webkit-box-shadow: inset 1px 1px 0 0 rgba(255, 255, 255, 0.2), inset -1px -1px 0 0 rgba(0, 0, 0, 0.2);
    -moz-box-shadow: inset 1px 1px 0 0 rgba(255, 255, 255, 0.2), inset -1px -1px 0 0 rgba(0, 0, 0, 0.2);
    box-shadow: inset 1px 1px 0 0 rgba(255, 255, 255, 0.2), inset -1px -1px 0 0 rgba(0, 0, 0, 0.2);
  }

  .signin .avatar {
    width: 100px;
    height: 200px;
    margin: 0 auto 35px auto;
  }

  .signin .avatar:before {
    text-align: center;
    font-family: Ionicons;
    display: block;
    height: 100%;
    line-height: 100px;
    font-size: 5em;
  }

  .signin .inputrow {
    position: relative;
  }

  .signin .inputrow label {
    position: absolute;
    top: 12px;
    left: 10px;
  }

  .signin .inputrow label:before {
    color: #538a9a;
    opacity: 0.4;
    -webkit-transition: opacity 300ms 0 ease;
    -moz-transition: opacity 300ms 0 ease;
    transition: opacity 300ms 0 ease;
  }

  .signin input[type="text"],
  .signin input[type="password"],
  #email,
  #telefone {
    padding: 10px 12px 10px 32px;
    display: block;
    width: 100%;
    margin-bottom: 10px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    background-color: #fff;
    color: #333;
    font-size: 1em;
    font-weight: 300;
    outline: none;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    -webkit-transition: border-color 300ms 0 ease;
    -moz-transition: border-color 300ms 0 ease;
    transition: border-color 300ms 0 ease;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .signin input[type="text"]:focus+label:before,
  .signin input[type="password"]:focus+label:before {
    opacity: 1;
  }

  .signin input[type="submit"] {
    -webkit-appearance: none;
    height: 40px;
    padding: 10px 12px;
    margin-bottom: 10px;
    background-color: #538a9a;
    text-transform: uppercase;
    color: #fff;
    border: 0px;
    float: right;
    margin: 0;
    outline: none;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }

  .signin input[type="submit"]:hover {
    background-color: #5e98a8;
  }

  .signin input[type="submit"]:active {
    background-color: #4a7b89;
  }

  input[type="checkbox"] {
    display: none;
  }

  input[type="checkbox"]+label {
    position: relative;
    padding-left: 36px;
    font-size: 0.6em;
    font-weight: normal;
    line-height: 16px;
    opacity: 0.8;
    text-transform: uppercase;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
  }

  input[type="checkbox"]+label:before,
  input[type="checkbox"]+label:after {
    content: "";
    position: absolute;
    display: block;
    height: 16px;
    -webkit-border-radius: 30px;
    -moz-border-radius: 30px;
    border-radius: 30px;
  }

  input[type="checkbox"]+label:before {
    left: 0;
    top: -2px;
    width: 30px;
    background: rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: inset 1px 1px 1px 1px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: inset 1px 1px 1px 1px rgba(0, 0, 0, 0.3);
    box-shadow: inset 1px 1px 1px 1px rgba(0, 0, 0, 0.3);
  }

  input[type="checkbox"]+label:after {
    opacity: 0.3;
    background: #fff;
    top: 0px;
    left: 2px;
    height: 12px;
    width: 12px;
    -webkit-transition: all 200ms 0 ease;
    -moz-transition: all 200ms 0 ease;
    transition: all 200ms 0 ease;
  }

  input[type="checkbox"]:checked+label {
    opacity: 1;
  }

  input[type="checkbox"]:checked+label:after {
    opacity: 1;
    left: 16px;
  }

  .cf:before,
  .cf:after {
    content: " ";
    display: table;
  }

  .cf:after {
    clear: both;
  }

  .cf {
    *zoom: 1;
  }
</style>
