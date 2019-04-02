import Home from './components/home/Home.vue';
import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios'

Vue.use(VueRouter);


export const routes = [
  {path : '/', component: Home},
  {path : '/:hash', component: Home, beforeEnter: (to, from, next) => {
    //10.0.0.110:4567
    let hash = to.params.hash;
    let url = `http://10.0.0.76:4567/api/sketch/${hash}`


    axios.get(url).then(response=>{
      to.params.pontos = response.data;
      next();
    })
    .catch(e =>{
      console.log(e);
    })

  }}
]

export default routes;
