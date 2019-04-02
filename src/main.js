import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import {routes} from './routes';


const router =  new VueRouter({routes});

const vue = new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

export default vue;
