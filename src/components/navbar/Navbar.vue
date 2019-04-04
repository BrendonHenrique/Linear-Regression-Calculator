<template>
  <div id="Navbar">
    <nav class="navbar navbar-expand-lg ">
      <a href='#' @click.prevent.stop="dispatchSalvar">
        <span>
          <font-awesome-icon icon="cloud-upload-alt" class="fa-2x" style="margin-top:0rem;" />
        </span>
      </a>
      <a href='#' @click.prevent.stop="dispatchReiniciar">
        <span>
          <font-awesome-icon icon="sync" class="fa-2x" style="margin-top:0rem;" />
        </span>
      </a>
      <a href='#' @click.prevent.stop="dispatchDownload">
        <span>
          <font-awesome-icon icon="file-csv" class="fa-2x" style="margin-top:0rem;" />
        </span>
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
      printPage() {
        this.$emit('dispatchDownload');
      }
    }
  }
</script>

<style>
  @import url(http://weloveiconfonts.com/api/?family=entypo);

  * {
    -webkit-font-smoothing: antialiased;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -ms-box-sizing: border-box;
    box-sizing: border-box;
  }

  a {
    margin-top: -20px;
    padding-bottom: 40px;
  }

  body {
    padding: 0;
    height: 80%;
    background: white;
  }


  #Navbar {
    white-space: nowrap;
    height: 0px;
    width: 260px;
    margin: 30px auto;
  }

  #Navbar a {
    background-image: linear-gradient(#485258, #30383c);
    width: 66px;
    height: 38px;
    text-decoration: none;
    padding-top: 9px;
    outline-width: 0px;
    z-index: 990;
    color: white;
    text-align: center;
    line-height: 1.2;
    /* display: block; */
  }

  #Navbar a:not(.active) {

    box-shadow:
      inset 0 1px 1px rgba(255, 255, 255, 0.1),
      inset 0 -1px 0px rgba(0, 0, 0, 0.2),
      0 9px 16px 0 rgba(0, 0, 0, 0.3),
      0 4px 3px 0 rgba(0, 0, 0, 0.3),
      0 0 0 1px rgba(0, 0, 0, .2);

    text-shadow: 0 0 21px rgba(223, 206, 228, 0.5), 0 -1px 0 #311d47;
  }

  #Navbar a:not(.active):hover,
  #Navbar a:not(.active):focus {
    color: #86c6ef;
    text-shadow: 0 0 2px rgba(255, 255, 255, .2);
  }

  #Navbar a:not(.active):active {
    color: #86c6ef !important;
    background: #313335;
    text-shadow: 0 0 21px #618398, 0 0 15px #618398, 0 0 2px #fff, 0 0 1px #000, 0 0 5px #618398;
    color: #86c6ef;
  }

  #Navbar a.active,
  #Navbar a:active {
    box-shadow:
      0 9px 16px 0 rgba(0, 0, 0, 0.1),
      0 0 0 1px rgba(0, 0, 0, .6),
      0 2px 1px 0 rgba(255, 255, 255, 0.05),
      inset 0 0 4px 3px rgba(0, 0, 0, 0.2),
      inset 0 0 10px rgba(0, 0, 0, .5);
    background: #313335;
    text-shadow: 0 0 5px #618398, 0 0 21px #618398, 0 0 15px #618398, 0 0 2px #fff, 0 0 1px #000, 0 0 5px #618398, 0 -1px 0 #fff, 0 1px 0 #000;
    color: #86c6ef;
  }

  #Navbar a.active:before,
  #Navbar a:active:before {
    position: absolute;
    background: linear-gradient(to bottom, #485258 0%, #485258 15%, #86c6ef 50%, #86c6ef 50%, #86c6ef 51%, #30383c 85%, #30383c 100%);
    /* W3C */
    display: block;
    Navbar: "";
    width: 1px;
    height: 36px;
    top: 1px;
    left: -2px;
    box-shadow: 0px 0 0px rgba(134, 199, 239, .2), 0px 0 1px rgba(255, 255, 255, .2), 0px 0 5px rgba(255, 255, 255, .4);
  }

  #Navbar a.active:after,
  #Navbar a:active:after {
    position: absolute;
    display: block;
    Navbar: "";
    width: 1px;
    height: 36px;
    top: 1px;
    right: -2px;
    background: linear-gradient(to bottom, #485258 0%, #485258 15%, #86c6ef 50%, #86c6ef 50%, #86c6ef 51%, #30383c 85%, #30383c 100%);
    /* W3C */
    box-shadow: 0px 0 0px rgba(134, 199, 239, .2), 0px 0 1px rgba(255, 255, 255, .2), 0px 0 5px rgba(255, 255, 255, .4);
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
    z-index: 1000
  }

  #Navbar a:active {
    z-index: 999
  }

  #Navbar a:last-of-type {
    -webkit-border-radius: 0 7px 7px 0;
    -moz-border-radius: 0 7px 7px 0;
    -ms-border-radius: 0 7px 7px 0;
    -o-border-radius: 0 7px 7px 0;
    border-radius: 0 7px 7px 0;
  }

  #Navbar a:first-of-type {
    -webkit-border-radius: 7px 0 0 7px;
    -moz-border-radius: 7px 0 0 7px;
    -ms-border-radius: 7px 0 0 7px;
    -o-border-radius: 7px 0 0 7px;
    border-radius: 7px 0 0 7px;
    left: 0;
  }

  #Navbar a:nth-of-type(2) {
    left: 67px
  }

  #Navbar a:nth-of-type(3) {
    left: 134px
  }

  #Navbar a:nth-of-type(4) {
    left: 200px
  }

  #Navbar a:nth-of-type(5) {
    left: 267px
  }

  #Navbar a:nth-of-type(6) {
    left: 255px
  }

  #Navbar a:nth-of-type(7) {
    left: 306px
  }

  #Navbar a:nth-of-type(8) {
    left: 357px
  }

  #Navbar a i:before {
    margin-left: 2px;
    font-size: 22px;
  }

  a span svg {
    width: 18px;
    stroke-width: 1.5;
    margin-top: -2px;
  }
</style>
