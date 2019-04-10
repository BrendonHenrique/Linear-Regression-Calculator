<template>
  <!-- Enviar formula em csv -->
  <div id="app">
    <meta charset="UTF-8">
    <div class="container">
      <div class="row">
        <div id="logo">
          <img src="../../assets/garten.png" style="width:18em;">
        </div>
        <transition name="slide-fade">
          <i v-if="showLoader">
            <b-spinner type="grow" style="margin-left:27rem;margin-top:2rem;"></b-spinner>
          </i>
        </transition>
        <transition name="slide-fade">
          <i v-if="!showLoader">
            <mineNavbar v-on:dispatchSalvar="salvarPontos" v-on:dispatchReiniciar="reiniciar"
              v-on:dispatchDownload="download" v-on:dispatchDownloadPDF="ExportarPDF"
              style="margin-left:20rem;margin-top:2rem;">
            </mineNavbar>
          </i>
        </transition>
      </div>
      <!-- Uso do bootstrap pela class container com divisões para cada linha com as classes 'row' -->
      <div class="row">
        <!--  CHARTS  JS  -->
        <div class="chart col-xs-36 col-sm-24 col-md-18 col-lg-10">
          <canvas id="myChart"></canvas>
        </div>
      </div>
      <!-- Loader para carregamento das operações -->
      <div id="loader" class="row">
        <div class="col-lg-2">

        </div>
      </div>
      <div class="row">
        <!-- painel da formula e painel de entrada de valores na função   -->
        <div class="col-xs-24 col-sm-16 col-md-12 col-lg-8" style="top: 6rem;">
          <div class="card  mb-4 ">
            <div class="row" id="InfosTabela">
              <div class="col-lg-6">
                <div class="card card-header">
                  <p>{{formula | formatoPadrao}}</p>
                  <p>f({{variavelDaFormula}}) = {{resultadoDaExpressao | redutor}}</p>
                  <div style="left:19px">
                    <form>
                        <p> x = <input type="number" v-on:keyup="atualizaResultado" v-model="variavelDaFormula"
                        maxlength='6' style="width: 50%;" step="any">
                        </p>
                    </form>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="card card-header">
                  <div class="row">
                    <p>
                      Calibrado ?
                      <input type="radio" id="Sim" name="calibrado" value="sim" v-model="booleanCalibrado" checked>
                      <label for="Sim">Sim</label>
                      <input type="radio" id="Nao" name="calibrado" v-model="booleanCalibrado" value="nao">
                      <label for="Nao">Não</label>
                    </p>
                  </div>
                  <transition name="fade">
                    <div v-if="booleanCalibrado == 'sim'">
                      <div class="row" style="height: 5rem;">
                        <p>
                          <label for="M">(m) </label>
                          <input type="number" id="M" name="calibrado" value="sim" maxlength='6' style="width: 50%;"
                            v-model="calibradoM" step="any" hecked>
                          <br>
                          <label for="M">(b) </label>
                          <input type="number" id="M" name="calibrado" value="sim" maxlength='6' v-model="calibradoB"
                            style="margin-left:0.5rem;width: 50%;" step="any">
                        </p>
                      </div>
                    </div>
                  </transition>
                </div>
              </div>
            </div>
            <div class="card card-body">
              <!-- Tabela de amostras Garten X Laboratório -->
              <table class="table">
                <thead>
                  <tr>
                    <th>
                      <h5>Garten</h5>
                    </th>
                    <th>
                      <h5>Laboratório</h5>
                    </th>
                  </tr>
                </thead>
                <tbody v-for="(indexValues, index) of valuesHabilitados" :key="index">
                  <tr>
                    <EditableCell :id="indexValues" :content="indexValues.x" @newEdit="valorNovoX">
                    </EditableCell>
                    <EditableCell :id="indexValues" :content="indexValues.y" @newEdit="valorNovoY">
                    </EditableCell>
                    <td>
                      <button class="btn btn-outline-danger" @click="excluirAmostra(index);">
                        <h5>Remover</h5>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!-- Painel de controle das amostras para adicionar, salvar, reiniciar e exportar em formato .csv -->
        <div class="col-xs-12 col-sm-8 col-md-6 col-lg-4 " style="top: 6rem;">
          <div id="painelAmostras" class="card mb-4 ">
            <div class="card card-header ">
              <h5>Adicionar amostra</h5>
            </div>
            <div class="card-body">
              <div class="form-group">
                <form @submit="insert()">
                  <label for="input1">
                    <p>X: Garten</p>
                    <input class="form-control" id="input1" type="number" step="any" autocomplete="off"
                      v-model="amostra.x" maxlength='6' required  />
                  </label>
                  <br>
                  <label for="input2">
                    <p>Y: Laboratório</p>
                    <input class="form-control" id="input2" type="number" step="any" autocomplete="off"
                      v-model="amostra.y" @keyup.enter="submit" maxlength='6' required />
                  </label><br><br>
                  <button type="submit" class="btn btn-outline-dark">Adicionar</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import Chart from 'chart.js';
  import axios from 'axios';
  import Toasted from 'vue-toasted';
  import BootstrapVue from 'bootstrap-vue'
  import jsPDF from 'jspdf';
  import BSpinner from 'bootstrap-vue/es/components/spinner/spinner'
  import Navbar from '../navbar/Navbar.vue';
  import EditableCell from '../EditableCell/EditableCell.vue';
  import ChartScript from '../../utils/Chart/ChartScript.js';
  import Calculadora from '../../utils/CalculadoraDeRegressao/Calculadora.js'
  import Conversor from '../../utils/Conversor/Conversor.js'
  Vue.use(Toasted);
  var myChart = null;
  var atualizaGrafico = function (vm, chart) {
    let regressao = Calculadora(vm);
    let valores = regressao.getValores();
    let variavelFloat = parseFloat(vm.variavelDaFormula);
    if (!isNaN(variavelFloat)) {
      vm.resultadoDaExpressao = regressao.calculaExpressao(variavelFloat);
    }
    chart.data.datasets[0].data = vm.valuesHabilitados;
    chart.data.datasets[1].data = valores;
    chart.data.datasets[2].data = vm.valuesDesabilitados;
    chart.update()
  }
  export default {
    data() {
      return {
        ChartScript: ChartScript,
        values: [],
        amostra: {
          x: 0,
          y: 0,
          habilitado: true
        },
        formula: '',
        visivel: [],
        hashCode: '',
        variavelDaFormula: 0.0,
        indexValues: 0,
        resultadoDaFormula: 0.0,
        gradiente: 0.0,
        interceptador: 0.0,
        resultadoDaExpressao: 0.0,
        showLoader: false,
        booleanCalibrado: 'nao',
        calibradoM: 1,
        calibradoB: 0,
        show: true
      }
    },
    mounted() {
      this.createChart('myChart', ChartScript, this);
      document.getElementById('input1').focus();
      // Teste de existência de pontos na rota localhost:8080/api/sketch
      if (this.$route.params.pontos) {
        this.values.push(...this.$route.params.pontos);
        // Teste de existência de pontos no localStorage
      } else if (localStorage.getItem('valuesDB')) {
        let storeValues = localStorage.getItem('valuesDB');
        let ValuesObject = JSON.parse(storeValues);
        this.values.push(...ValuesObject);
      } else {
        if (this.values.length > 0) {
          localStorage.setItem("valuesDB", JSON.stringify(this.values));
        }
      }
      window.myChart = myChart
      this.toastIt(this, 'info');
    },
    updated() {
      atualizaGrafico(this, myChart);
    },
    watch: {
      values() {
        let regressao = Calculadora(this);
        localStorage.setItem("valuesDB", JSON.stringify(this.values));
      }
    },
    methods: {
      getData() {
        let data = new Date(),
          dia = data.getDate().toString(),
          diaF = (dia.length == 1) ? '0' + dia : dia,
          mes = (data.getMonth() + 1).toString(),
          mesF = (mes.length == 1) ? '0' + mes : mes,
          anoF = data.getFullYear();
        return diaF + "-" + mesF + "-" + anoF;
      },
      // Fazer download em PDF
      ExportarPDF() {
        if (this.values.length > 0) {
          let doc = new jsPDF();
          // Desenhando tabelas M/B
          doc.rect(140, 30, 50, 10)
          doc.text(` Calibrado : ${this.booleanCalibrado}`, 140, 38);
          doc.rect(140, 40, 50, 40)
          doc.text('m: ', 150, 50)
          doc.text('b: ', 150, 70)
          doc.text(`${this.calibradoM}`, 160, 50)
          doc.text(`${this.calibradoB}`, 160, 70)
          // Header Garten / Laboratório
          doc.rect(20, 20, 100, 10)
          doc.text(`${this.formula}`, 50, 27)
          doc.rect(20, 30, 50, 10)
          doc.rect(70, 30, 50, 10)
          doc.text('X: Garten', 30, 38)
          doc.text('Y: Laboratório', 75, 38)
          let contadorTexto = 47;
          let contadorTabela = 40;
          //Corpo - Preencher X
          this.values.forEach(element => {
            doc.text(`${element.x}`, 40, contadorTexto)
            doc.rect(20, contadorTabela, 50, 10)
            doc.text(`${element.y}`, 90, contadorTexto)
            doc.rect(70, contadorTabela, 50, 10)
            contadorTexto += 10;
            contadorTabela += 10;
          });
          // Gravador
          let data = this.getData();
          doc.save(`${data}.pdf`);
        } else {
          this.toastIt(this, 'valorInsuficiente');
        }

      },
      // Fazer download em CSV
      download: function (event) {
        if (this.values.length > 0) {
          //Linhas
          var headers = {
            x: 'Garten',
            y: 'Laboratório',
            formula: 'Formula : ' + this.formula
          };
          //Colunas
          var itemsNotFormatted = [{
            x: '',
            y: ''
          }];
          itemsNotFormatted.push(...this.values);
          var itemsFormatted = [];
          // format the data
          itemsNotFormatted.forEach((item) => {
            itemsFormatted.push({
              x: item.x,
              y: item.y
            });
          });
          // Gravador
          let fileTitle = this.getData();
          Conversor.exportCSVFile(headers, itemsFormatted, fileTitle);
        } else {
          this.toastIt(this, 'valorInsuficiente');
        }
      },
      // Interface de Avisos
      toastIt(vm, choice) {
        if (choice == 'info') {
          let toast = vm.$toasted.info("Bem vindo(a) ", {
            theme: "bubble",
            position: "top-right",
            duration: 5000
          });
        } else if (choice == 'success') {
          let toast = vm.$toasted.success("Amostra salva com sucesso ", {
            theme: "bubble",
            position: "top-right",
            duration: 5000
          });
        } else if (choice == 'error') {
          let toast = vm.$toasted.error("Não foi possível salvar, tente novamente ", {
            theme: "bubble",
            position: "top-right",
            duration: 5000
          });
        } else if (choice == 'valorInsuficiente') {
          let toast = vm.$toasted.error("Não possui amostras suficientes ", {
            theme: "bubble",
            position: "top-right",
            duration: 5000
          });
        }
      },
      atualizaResultado() {
        atualizaGrafico(this, myChart);
      },
      // Inserir e remover amostras
      insert() {
        this.values.push(Object.assign({}, this.amostra));
        this.amostra.x = '';
        this.amostra.y = '';
        document.getElementById('input1').focus();
      },
      excluirAmostra(index) {
        this.values.splice(index, 1);
      },
      // Guardar as informações no banco , por meio do POST pela interface salvarPontos
      post() {
        // let url = `http://10.0.0.110:4567/api/sketch/${this.$route.params.hash}`;
        let url = `http://localhost:8080/api/sketch/${this.$route.params.hash}`
        this.showLoader = true;
        axios.post(url, JSON.smyChart
          .then(response => {
            setTimeout(() => {
              myChart
              let urlAtual = window.location.href;
              if (!urlAtual.includes(this.$route.params.hash)) {
                window.location.assign(urlAtual + this.$route.params.hash);
              }
              Calculadora(this, gradiente, interceptador);
              myChart.update();
            }, 1000);
            if (response.status == 200) {
              this.toastIt(this, 'success');
            }
          })
          .catch(
            error => {
              this.toastIt(this, 'error');
            }
          )
          .finally(
            loader => {
              this.showLoader = false;
              this.ExportarPDF();
            }
          )
        )
      },
      salvarPontos() {
        if (this.values.length > 0) {
          let url = `http://10.0.0.110:4567/api/sketch`;
          // let url = 'http://localhost:8080/api/sketch'
          this.showLoader = true;
          if (this.$route.params.hash) {
            this.hashCode = this.$route.params.hash;
            this.post();
          } else {
            axios.get(url).then(response => {
                this.hashCode = this.$route.params.hash = response.data;
                this.post();
              })
              .catch(
                error => {
                  this.toastIt(this, 'error');
                }
              )
              .finally(loader => {
                this.showLoader = false;
                this.ExportarPDF();
              })
          }
        } else {
          this.toastIt(this, 'valorInsuficiente');
        }
      },
      valorNovoX(id, novoValor) {
        id.x = parseFloat(novoValor);
        Calculadora.calculaRegresaoLinear(this, gradiente, interceptador);
      },
      valorNovoY(id, novoValor) {
        id.y = parseFloat(novoValor);
        myChart.update();
        Calculadora.calculaRegresaoLinear(this, gradiente, interceptador);
        myChart.update();
      },
      reiniciar() {
        if (this.values.length > 0) {
          if (confirm('Você quer mesmo reiniciar as amostras ?')) {
            this.values = [];
            atualizaGrafico(this, myChart);
          }
        }
      },
      createChart(chartId, chartData, vue) {
        const ctx = document.getElementById(chartId);
        myChart = new Chart(ctx, {
          type: chartData.type,
          data: {
            datasets: [{
              label: "Gráfico de amostras",
              backgroundColor: '#8E4A49',
              borderColor: '#8E4A49',
              data: this.valuesHabilitadoschart
            }, {
              type: "line",
              label: "Linha de tendência",
              borderColor: '#468C81',
              backgroundColor: 'rgba(0,0,0,0)',
              showLine: true,
              data: []
            }, {
              type: 'scatter',
              label: "Amostras escondidas",
              borderColor: '#C4BBBD',
              backgroundColor: '#C4BBBD',
              data: this.valuesDesabilitados
            }]
          },
          options: chartData.options,
        });
        var canvas = document.getElementById('myChart');
        canvas.onclick = (evt) => {
          var activePoints = myChart.getElementAtEvent(evt);
          if (activePoints[0]) {
            let chartData = activePoints[0]._chart.config.data;
            let idx = activePoints[0]._index;
            let valueClicado = chartData.datasets[activePoints[0]._datasetIndex].data[idx];
            vue.values.forEach((element, index) => {
              if (element.x == valueClicado.x &&
                element.y == valueClicado.y) {
                vue.values[index].habilitado ^= true;
              }
            });
            atualizaGrafico(this, myChart);
          }
        }
      }
    },
    components: {
      'mineNavbar': Navbar,
      'EditableCell': EditableCell,
      'b-spinner': BSpinner
    },
    computed: {
      valuesHabilitados() {
        return this.values.filter((val) => val.habilitado);
      },
      valuesDesabilitados() {
        return this.values.filter((val) => !val.habilitado);
      }
    },
    filters: {
      // o retorno de calcular() é do tipo float , sem tratamento , pra isso uso esse filtro redutor de string
      redutor: function (value) {
        if (isNaN(value)) {
          return '0'
        }
        value = value.toString();
        return value.length == 6 || value.length == 2 ? value.slice(0, 3) : value.slice(0, 4)
      },
      formatoPadrao: function (formato) {
        return formato.includes("NaN") ? "y = m * x + b" : formato;
      }
    }
  }
</script>
<style>

  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active em versões anteriores a 2.1.8 */ {
    transform: translateY(-100px);
    opacity: 0;
  }

  .fade-enter-active,.fade-leave-active {
    transition: opacity 1s;
  }

  .fade-enter,.fade-leave-to{
    opacity: 0;
  }

  #InfosTabela {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    align-content: stretch;
  }

  .card {
    background-color: white;
  }

  .chart {
    top: 4rem;
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
  }

  #painelAmostras {
    position: sticky;
    top: 1rem;
  }
</style>
