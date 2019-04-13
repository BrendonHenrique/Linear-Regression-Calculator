<template>
  <div id="app">
    <meta charset="UTF-8">
    <transition name="slide-fade">
      <i v-if="showLoader">
        <b-spinner type="grow" style="margin-left:45%;margin-top: 4rem;margin-bottom:4rem;"></b-spinner>
      </i>
    </transition>
    <transition name="slide-fade">
      <i v-if="!showLoader">
        <mineNavbar v-on:dispatchSalvar="salvarPontos" v-on:dispatchReiniciar="reiniciar"
          v-on:dispatchDownload="download" v-on:dispatchDownloadPDF="ExportarPDF">
        </mineNavbar>
      </i>
    </transition>

    <div class="container" style="margin-top:5rem;">
      <div class="row">
        <div class="charts col-xs-36 col-sm-24 col-md-18 col-lg-10 ">
          <canvas id="myChart"></canvas>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 col-sm-8 col-md-6 col-lg-4  order-xs-first order-sm-first order-md-first order-lg-last"
          style="top: 4rem;">
          <div id="painelAmostras" class="card mb-4 ">
            <div class="card card-header ">
              <h5>Adicionar amostra</h5>
            </div>
            <div class="card-body">
              <div class="form-group">
                <form @submit="insert()">
                  <b-input-group>
                    <b-input-group-text slot="prepend" prepend="Label" style="padding-right:2.7rem;">X:Garten
                    </b-input-group-text>
                    <b-form-input id="input1" type="number" step="any" autocomplete="off" v-model="amostra.x"
                      maxlength='6' required></b-form-input>
                  </b-input-group>
                  <b-input-group>
                    <b-input-group-text slot="prepend" prepend="Label">Y:Laboratório
                    </b-input-group-text>
                    <b-form-input id="input2" type="number" step="any" autocomplete="off" v-model="amostra.y"
                      @keyup.enter="submit" maxlength='6' required></b-form-input>
                  </b-input-group>
                  <br>
                  <button type="submit" class="btn btn-outline-dark">Adicionar</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xs-24 col-sm-16 col-md-12 col-lg-8 order-xs-2" style="top: 3rem;">
          <div class="row">
            <div class="col-lg-6">
              <b-card no-body class="mb-2">
                <b-card-header header-tag="header" class="p-1">
                  <b-button block href="#" v-b-toggle.accordion-1 variant="info">Ver equação</b-button>
                </b-card-header>
                <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
                  <b-card-body>
                    <b-alert show variant="info">Informe um valor para X e ele será usado para o calculo da equação.
                      Os valores atuais das constantes M e B são respectivamente {{gradiente}} e {{interceptador}}
                    </b-alert><br>
                    <p>{{formula | formatoPadrao}}</p>
                    <p>f({{variavelDaFormula}}) = {{resultadoDaExpressao | redutor}}</p>
                    <b-input-group>
                      <b-input-group-text slot="prepend" prepend="Label">X
                      </b-input-group-text>
                      <b-form-input type="number" v-on:keyup="atualizaResultado" v-model="variavelDaFormula" max='6'
                        style="width: 50%;" step="any"></b-form-input>
                    </b-input-group>
                  </b-card-body>
                </b-collapse>
              </b-card>
            </div>
            <div class="col-lg-6 order-xs-3">
              <b-card no-body class="mb-2">
                <b-card-header header-tag="header" class="p-1">
                  <b-button block href="#" v-b-toggle.accordion-2 variant="info">Já calibrou antes ? Clique aqui !
                  </b-button>
                </b-card-header>
                <b-collapse id="accordion-2" visible accordion="my-accordion" role="tabpanel">
                  <b-card-body>
                    <b-alert show variant="info">Informe as constantes M e B de calibrações anteriores, para reajustar
                      os valores das amostras com as antigas calibrações</b-alert><br>
                    <b-input-group>
                      <b-input-group-text slot="prepend" prepend="Label">M
                      </b-input-group-text>
                      <b-form-input type="number" id="M" name="calibrado" value="sim" v-model="calibradoM" step="any"
                        checked></b-form-input>
                    </b-input-group>
                    <b-input-group>
                      <b-input-group-text slot="prepend" style="padding-right:0.95rem;" prepend="Label">B
                      </b-input-group-text>
                      <b-form-input type="number" id="M" name="calibrado" value="sim" v-model="calibradoB" step="any">
                      </b-form-input>
                    </b-input-group>
                  </b-card-body>
                </b-collapse>
              </b-card>
            </div>
          </div>
          <div class="card mb-6">
            <div class="card-body">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>
                      <h5><b>Garten</b></h5>
                    </th>
                    <th>
                      <h5><b>Laboratório</b></h5>
                    </th>
                    <th>
                    </th>
                  </tr>
                </thead>
                <tbody v-for="(indexValues, index) of valuesHabilitados" :key="index">
                  <tr v-b-tooltip.hover.bottom="'Clique no número para editar !'">
                    <EditableCell :id="indexValues" :content="indexValues.x" @newEdit="valorNovoX">
                    </EditableCell>
                    <EditableCell :id="indexValues" :content="indexValues.y" @newEdit="valorNovoY">
                    </EditableCell>
                    <button class="btn btn-outline-danger" @click="excluirAmostra(index);">
                      <h6>Remover</h6>
                    </button>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer style="margin-top:5rem; background-color:#343A40">
      <div class="text-center py-3">
        <font color="white">
         © 2019 Garten - Automação - Todos os direitos reservados
        </font>
      </div>
    </footer>
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
  var regressao;

  var atualizaGrafico = function (vm, chart) {
    regressao = Calculadora(vm);
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

        this.gradiente = regressao.gradiente;
        this.interceptador = regressao.interceptador;


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
      getHora() {
        let data = new Date();
        let horas = data.getHours();
        let minutos = data.getMinutes();

        return horas + ':' + minutos;
      },
      // Fazer download em PDF

      ExportarPDF() {
        if (this.values.length > 0) {

          let doc = new jsPDF();
          let horas = this.getHora();
          let contadorTexto = 47;
          let contadorTabela = 40;
          let data = this.getData();


          // Desenhando tabelas M/B
          doc.rect(140, 20, 50, 55)
          doc.text(` Calibrado : ${this.booleanCalibrado}`, 140, 28);
          doc.text('m: ', 142, 40)
          doc.text('b: ', 142, 50)
          doc.text(`${this.calibradoM}`, 152, 40)
          doc.text(`${this.calibradoB}`, 152, 50)
          doc.text(`Data:${data} `, 142, 60)
          doc.text(`Horas:${horas}`, 142, 70)

          // Header Garten / Laboratório
          doc.rect(20, 20, 100, 10)
          doc.text(`${this.formula}`, 50, 27)
          doc.rect(20, 30, 50, 10)
          doc.rect(70, 30, 50, 10)
          doc.text('X: Garten', 30, 38)
          doc.text('Y: Laboratório', 75, 38)
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
            y: 'Lab',
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
      },
      getM: function (formula) {
        let splited = formula.split('');
      },
      getB: function (formula) {

      }

    }
  }
</script>
<style>
  .charts {
    min-width: 50%;
    min-height: 60%;
  }

  body {
    background-color: #F8F9FA
  }

  .slide-fade-enter-active {
    transition: all .2s;
  }

  .slide-fade-leave-active {
    opacity: 0;
  }

  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translateY(-100px);
    opacity: 0;
  }

  .card {
    background-color: rgba(255, 255, 255, 0.8);
  }

  #painelAmostras {
    position: sticky;
    top: 1rem;
  }
</style>
