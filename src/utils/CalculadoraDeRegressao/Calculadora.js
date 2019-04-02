import regression from 'regression';

class Regressao {
  constructor(valores, gradiente, interceptador) {
    this.valores = [];
    this.gradiente = gradiente;
    this.interceptador = interceptador;
    this.valores.push(...valores);
  }
  getValores() {
    return this.valores;
  }
  getInterceptador() {
    return parseFloat(this.interceptador);
  }
  getGradiente() {
    return parseFloat(this.gradiente);
  }
  calculaExpressao(value) {
    return this.gradiente * value + this.interceptador;
  }
}
export const Calculadora = function (vm) {
  if (vm.values.length > -1) {
    let pontos = vm.valuesHabilitados.map((val) => [parseFloat(val.x), parseFloat(val.y)]);
    let regres = regression.linear(pontos);
    vm.formula = regres.string;
    let tendenciaVetor = regres.points.map((el) => {
      return {
        x: el[0],
        y: el[1]
      }
    });
   tendenciaVetor.sort((elA, elB) => {
      return elA.x - elB.x
    })
    return new Regressao(tendenciaVetor, regres.equation[0], regres.equation[1]);
  } else {
    vm.formula = 'y';
    return new Regressao();
  }
}

export default Calculadora;
