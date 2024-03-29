import Home from './components/home/Home.vue';
import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
// import Login from './components/Login/login.vue';
// import Cadastro from './components/Cadastro/Cadastro.vue';
Vue.use(VueRouter);

export const routes = [
  {
    path : '/',
    component: Home, beforeEnter: (to,from,next) =>{
      next();
    }
  },
  {path : '/:hash', component: Home, beforeEnter: (to, from, next) => {
    //10.0.0.110:4567
    let hash = to.params.hash;
    let url = `http://10.0.0.112:4567/api/sketch/${hash}`
    axios.get(url).then(response=>{
      to.params.pontos = response.data;
      next();
    })
    .catch(e =>{
    })
  }}
]
export default routes;


