import Home from './components/home/Home.vue';
import axios from 'axios'

export const routes = [
  {path : '/', component: Home},
  {path : '/:hash', component: Home, beforeEnter: (to, from, next) => {

    let hash = to.params.hash;
    let url = `/api/sketch/${hash}`
    // let url = 'file:///home/desenvolvimento02/Desktop/dados.json';
    let dados;

    //fetch dos dados com axios
    axios.get(url).then(response=>{
      dados = response.data;
    })
    .catch(e =>{
      this.errors.push(e);
      console.log(e);
    })

    // let dadoss = [{x: 10, y:15},{x:20 , y:35},{x:20 , y:10}];

    // passa param pra rota
    to.params.pontos = dados;

    // Acessar os parametros
    console.log(to.params.pontos);

    // Criar parametro novo na rota
    // to.params.qualquerNome = 'QualquerValor';
    // console.log(to.params.qualquerNome);


   next();
  }}
];
