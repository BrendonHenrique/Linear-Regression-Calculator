<template>
  <!-- Para adicionar icones <font-awesome-icon icon="coffee" /> -->
  <div id="app">
    <!-- <meta name="viewport" content="width=device-width, initial-scale=1.0"> -->
    <!-- Navbar com logo da Garten -->
    <div class="container">
      <div class="row">
        <mineNavbar v-on:dispatchSalvar="salvarPontos" v-on:dispatchReiniciar="reiniciar"
          v-on:dispatchDownload="download">
        </mineNavbar>
      </div>
      <!-- Uso do bootstrap pela class container com divisões para cada linha com as classes 'row' -->
      <div class="row">
        <!--  CHARTS  JS  -->
        <div class="chart col-xs-36 col-sm-24 col-md-18 col-lg-10" >
          <canvas id="myChart"></canvas>
        </div>
      </div>
      <div class="row">
        <!-- painel da formula e painel de entrada de valores na função   -->
        <div class="col-xs-24 col-sm-16 col-md-12 col-lg-8" style="top: 6rem;">
          <div class="card border-secondary mb-4 ">
            <div class="card-header">
              <h3>{{formula | formatoPadrao}}</h3>
              <div style="left:19px">
                <h3> x = <input type="number" v-on:keyup="atualizaResultado" v-model="variavelDaFormula" maxlength='6'
                    style="width: 10%;"></h3>
              </div>
              <h3>f({{variavelDaFormula}}) = {{resultadoDaExpressao | redutor}}</h3>
            </div>
            <div class="card-body">
              <!-- Tabela de amostras Garten X Laboratório -->
              <table class="table">
                <thead>
                  <tr>
                    <th>
                      <h2>Garten</h2>
                    </th>
                    <th>
                      <h2>Laboratório</h2>
                    </th>
                  </tr>
                </thead>
                <tbody v-for="(indexValues, index) of valuesHabilitados" :key="index">
                  <tr>
                    <!-- Uso do componente .vue EditableCell para uma tabela com células editáveis -->
                    <EditableCell :id="indexValues" :content="indexValues.x" @newEdit="valorNovoX">
                    </EditableCell>
                    <EditableCell :id="indexValues" :content="indexValues.y" @newEdit="valorNovoY">
                    </EditableCell>
                    <td>
                      <button class="btn btn-outline-danger" @click="excluirAmostra(index);">
                        <h3>Remover</h3>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!-- Painel de controle das amostras para adicionar, salvar, reiniciar e exportar em formato .csv -->

        <div class="col-xs-12 col-sm-8 col-md-6 col-lg-4" style="top: 6rem;">
          <div id="painelAmostras" class="card border-secondary mb-4">
            <div class="card-header border-secondary">
              <h3>Adicionar amostra</h3>
            </div>
            <div class="card-body border-secondary">
              <div class="form-group">


                <div class="inputX">
                  <i class="icon">
                    <font-awesome-icon icon="edit"/>
                  </i>
                  <input class="form-control" id="input1" type="number" step="any" autocomplete="off" v-model="amostra.x"
                    @keyup.enter="insert"
                    maxlength='6'
                    style="width: 30%;"
                    required/>
                </div>

                <label for="input2">
                  <input class="form-control" id="input2" type="number" step="any" autocomplete="off" v-model="amostra.y"
                  @keyup.enter="insert"
                  maxlength='6'
                  style="width: 55%;"
                  required/>
                </label>

              </div>
              <button type="button" class="btn btn-outline-dark" @click="insert()">
                <h4>Adicionar</h4>
              </button>
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
        resultadoDaExpressao: 0.0
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
      download: function (event) {
        //Linhas
        var headers = {
          x: 'Garten',
          y: 'Laboratorio', // remove commas to avoid errors
        };

        //Colunas
        var itemsNotFormatted = [{
          x: '',
          y: '',
        }];
        itemsNotFormatted.push(...this.values);
        console.log(itemsNotFormatted);
        // console.log(itemsNotFormatted);
        var itemsFormatted = [];
        // format the data
        itemsNotFormatted.forEach((item) => {
          itemsFormatted.push({
            x: item.x,
            y: item.y
          });
        });
        var fileTitle = 'orders';
        Conversor.exportCSVFile(headers, itemsFormatted, fileTitle);
      },

      toastIt(vm, choice) {
        if (choice == 'info') {
          let toast = vm.$toasted.info("Bem vindo(a) !!", {
            theme: "outline",
            position: "bottom-right",
            duration: 5000
          });
        } else if (choice == 'success') {
          let toast = vm.$toasted.success("Amostra salva com sucesso !!", {
            theme: "outline",
            position: "bottom-right",
            duration: 5000
          });
        } else if (choice == 'error') {
          let toast = vm.$toasted.error("Não foi possível salvar, tente novamente !!", {
            theme: "outline",
            position: "bottom-right",
            duration: 5000
          });
        }
      },
      atualizaResultado() {
        atualizaGrafico(this, myChart);
      },
      insert() {
        this.values.push(Object.assign({}, this.amostra));
        this.amostra.x = '';
        this.amostra.y = '';
        document.getElementById('input1').focus();
      },
      excluirAmostra(index) {
        this.values.splice(index, 1);
      },
      post() {
        // let url = `http://10.0.0.110:4567/api/sketch/${this.$route.params.hash}`;
        let url = `http://localhost:8080/api/sketch/${this.$route.params.hash}`
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
        )
      },
      salvarPontos() {
        let url = `http://10.0.0.110:4567/api/sketch`;
        // let url = 'http://localhost:8080/api/sketch'

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
        if (confirm('Você quer mesmo reiniciar as amostras ?')) {
          this.values = [];
          atualizaGrafico(this, myChart);
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
  /* Template do chart quebra em x,y  onde x < 360 */


  .inputX{
    position:relative;
  }

  .inputX .icon{
    position:absolute;
    padding:10px;
    pointer-events: none;
  }
  .inputX .icon{ padding-left:0px;}
  .inputX .icon{ padding-right:0px;}


  .chart{
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
