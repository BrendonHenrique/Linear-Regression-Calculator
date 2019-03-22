<template>
  <div id="app">
    <div class="row">
      <div class="col">
        <mineNavbar></mineNavbar>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-8">
          <canvas id="myChart"></canvas>
        </div>
        <div class="col-4">
          <div>
            <b-tabs content-class="mt-4">
              <!-- Tabs Menu-->
              <b-tab title="Inserir" active>
                <!-- Tab adicionar -->

                <div class="card border-primary mb-4" style="max-width: 20rem;">
                  <div class="card-header">Adicionar amostra
                  </div>
                  <div class="card-body">
                    <div class="form-group">
                      <label for="form-control">
                        Garten:
                      </label>
                      <input class="form-control" id="input1" type="number" step="any" autocomplete="off"
                        v-model="amostra.x" @keyup.enter="insert">
                      <label for="lab">
                        Laboratório:
                      </label>
                      <input class="form-control" id="input2" type="number" step="any" name="lab" autocomplete="off"
                        v-model="amostra.y" @keyup.enter="insert" tabindex="1"/>
                    </div>
                    <button class="btn btn-outline-primary" @click="insert()">Adicionar</button>
                    <button class="btn btn-outline-primary">Salvar</button>
                  </div>
                </div>

              </b-tab> <!-- <%--adicionar--%> -->
            </b-tabs>
          </div>
        </div>
      </div>
      <!-- <h1>User{{ $route.params.valor}}</h1> -->

      <div class="row">
        <h1 class="btn btn-primary disabled">{{formula}}</h1>
      </div>
      <!-- Table Row -->
      <div class="row">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Garten</th>
              <th>Laboratório</th>
              <th></th>
            </tr>
          </thead>
          <tbody v-for="(indexValues, index) of values" :key="index">
            <tr>
              <td>{{indexValues.x}}</td>
              <td>{{indexValues.y}}</td>
              <td>
                <button class="btn btn-outline-danger" @click="excluirAmostra(index);">Remover </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Table Row -->
    </div>
  </div>
</template>

<script>
  import Navbar from '../navbar/Navbar.vue';
  import Chart from 'chart.js';
  import regression from 'regression';
  import ChartScript from '../chart/ChartScript.js';
  import axios from 'axios';

  var myChart = null;

  function calculaRegresaoLinear(vm) {
    if (vm.values.length > 1) {
      let pontos = vm.values.map((val) => [parseFloat(val.x), parseFloat(val.y)]);
      let regres = regression.linear(pontos);
      vm.formula = regres.string;
      let tendenciaVetor = regres.points.map((el) => {
        return {
          x: el[0],
          y: el[1]
        }
      });
      myChart.data.datasets[1].data = tendenciaVetor;
    } else {
      vm.formula = 'y';
    }
  }

  export default {
    data() {
      return {
        ChartScript: ChartScript,
        values: [],
        amostra: {
          x: 0,
          y: 0
        },
        formula: 'y'
      }
    },
    components: {
      'mineNavbar': Navbar
    },
    methods: {
      createChart(chartId, chartData) {
        const ctx = document.getElementById(chartId);
        myChart = new Chart(ctx, {
          type: chartData.type,
          data: {
            datasets: [{
                label: "Gráfico de amostras",
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: this.values
              },
              {
                type: "line",
                label: "Linha de tendência",
                borderColor: 'rgb(132, 99, 255)',
                backgroundColor: 'rgba(0,0,0,0)',
                showLine: true,
                data: []
              }
            ]
          },
          options: chartData.options,
        });
      },
      insert() {
        this.values.push(Object.assign({}, this.amostra));
      },
      excluirAmostra(index) {
        this.values.splice(index, 1);
      }
    },
    watch: {
      values() {
        calculaRegresaoLinear(this);
        document.querySelector("input").focus();
        myChart.update()
      }
    },
    mounted() {
      this.createChart('myChart', ChartScript);
      // console.log(this.$route.params.pontos);
      if (this.$route.params.pontos) {
        this.values = this.$route.params.pontos;
      }
    }
  }

</script>
<style>
</style>
